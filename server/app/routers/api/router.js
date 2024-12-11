const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../../../index");

const db = pool;
const router = express.Router();
const imgActions = require("../../controllers/imgActions");
const ContactRepository = require("../../../database/models/ContactRepository");
const AdminRepository = require("../../../database/models/AdminRepository");
const galleryActions = require("../../controllers/galleryActions");

// Initialisation des repositories
const contactRepository = new ContactRepository();
const adminRepository = new AdminRepository(db);

// Configuration de multer pour le téléchargement des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../../public/uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Route pour télécharger l'image et l'ajouter dans la base de données
const getImageUrl = (filename) => `/uploads/${filename}`;

// Routes pour ajouter une image dans la galerie
router.post("/api/add-image", upload.single("file"), async (req, res) => {
  const { name, author, exposure } = req.body;

  const filename = req.file ? req.file.filename : null;

  if (!filename || !name || !author || !exposure) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const result = await adminRepository.query(
      "INSERT INTO accueil (filename, name, author, exposure) VALUES (?, ?, ?, ?)",
      [filename, name, author, exposure]
    );

    return res.status(201).json({
      message: "Image ajoutée avec succès",
      image: {
        id: result.insertId,
        filename: getImageUrl(filename),
        name,
        author,
        exposure,
      },
    });
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'image:", err);
    return res.status(500).json({ message: "Erreur d'ajout de l'image" });
  }
});
router.get("/api/random-image", async (req, res) => {
  try {
    const randomImage = await imgActions.getRandomImage();
    if (!randomImage) {
      return res.status(404).json({ error: "Aucune image trouvée" });
    }

    const imageWithUrl = {
      ...randomImage,
      imageUrl: `/uploads/${randomImage.filename}`,
    };

    return res.json(imageWithUrl);
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/images/:id", imgActions.deleteImage);

// Routes pour gérer les messages de contact
router.post("/Contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  // Validation des champs requis
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const id = await contactRepository.create({
      firstName,
      lastName,
      email,
      message,
    });

    return res
      .status(201)
      .json({ message: "Message enregistré avec succès", id });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du message:", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de l'enregistrement du message" });
  }
});

// Récupérer tous les messages
router.get("/admin/messages", async (req, res) => {
  try {
    const messages = await contactRepository.readAll();
    res.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des messages" });
  }
});

// Supprimer un message par ID
router.delete("/admin/messages/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const message = await contactRepository.readById(id);

    if (!message) {
      return res.status(404).json({ error: "Message non trouvé" });
    }

    await contactRepository.deleteById(id);
    return res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression du message" });
  }
});

// Routes pour la galerie d'images
router.get("/accueil", async (req, res) => {
  try {
    const [rows] = await adminRepository.getAllImages();
    const imagesWithUrls = rows.map((image) => ({
      ...image,
      filename: image.filename, // Assurez-vous que cette fonction renvoie le bon chemin
    }));
    res.json(imagesWithUrls);
  } catch (err) {
    console.error("Erreur de récupération des images:", err);
    res.status(500).send("Erreur de récupération des images");
  }
});

// Ajouter une image à la galerie

// Route pour ajouter une image à la galerie
router.post("/accueil", upload.single("file"), async (req, res) => {
  const { name, author, exposure } = req.body;
  const filename = req.file ? req.file.filename : null;

  if (!filename || !name || !author || !exposure) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const result = await adminRepository.addImage(
      filename,
      name,
      author,
      exposure
    );
    return res.status(201).json({
      message: "Image ajoutée avec succès",
      image: {
        id: result.insertId,
        filename: getImageUrl(filename),
        name,
        author,
        exposure,
      },
    });
  } catch (err) {
    console.error("Erreur d'ajout de l'image:", err);
    return res.status(500).json({ message: "Erreur d'ajout de l'image" });
  }
});

// Modifier une image dans la galerie
router.put("/accueil/:id", async (req, res) => {
  const { filename, name, author, exposure } = req.body;
  const { id } = req.params;

  if (!filename || !name || !author || !exposure) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    await adminRepository.updateImage(id, filename, name, author, exposure);
    return res.status(200).json({ message: "Image modifiée avec succès" });
  } catch (err) {
    console.error("Erreur de modification de l'image:", err);
    return res
      .status(500)
      .json({ message: "Erreur de modification de l'image" });
  }
});

// Supprimer une image de la galerie
router.delete("/accueil/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await adminRepository.deleteImage(id);
    res.status(200).json({ message: "Image supprimée avec succès" });
  } catch (err) {
    console.error("Erreur de suppression de l'image:", err);
    res.status(500).json({ message: "Erreur de suppression de l'image" });
  }
});
// Ajoutez ces imports si nécessaire

router.get("/galeries", galleryActions.getAllGalleries);
router.get("/galeries/:id/images", async (req, res) => {
  try {
    // Récupérer les données de l'image depuis galleryActions
    const images = await galleryActions.getGalleryImages(req, res);

    // Vérifier si des données ont été retournées
    if (!images) {
      return res.status(404).json({ error: "Aucune image trouvée" });
    }
    return images;

    // Renvoyer la réponse avec les données de l'image
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/galeries/:id/images", galleryActions.getGalleryImages);
router.post("/galeries", galleryActions.createGallery);
router.post(
  "/galeries/:id/images",
  upload.single("file"),
  galleryActions.addImageToGallery
);
router.delete("/galeries/:id", galleryActions.deleteGallery);
router.delete(
  "/galeries/:galleryId/images/:imageId",
  galleryActions.deleteImageFromGallery
);

module.exports = router;
