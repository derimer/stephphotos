const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../../../index");

const db = pool;
const router = express.Router();
const imgActions = require("../../controllers/imgActions");
const ContactRepository = require("../../../database/models/ContactRepository");
const AdminRepository = require("../../../database/models/AdminRepository");
const GalleryRepository = require("../../../database/models/GalleryRepository");

const galleryRepository = new GalleryRepository(db);
// Initialisation des repositories
const contactRepository = new ContactRepository();
const adminRepository = new AdminRepository(db);

// Configuration de multer pour le téléchargement des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../public/uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
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

    res.status(201).json({
      message: "Image ajoutée avec succès",
      image: { 
        id: result.insertId, 
        filename: getImageUrl(filename), 
        name, 
        author, 
        exposure 
      },
    });
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'image:", err);
    res.status(500).json({ message: "Erreur d'ajout de l'image" });
  }
});
// Routes pour les images
// router.get("/images", imgActions.getAllImages);
router.delete("/images/:id", imgActions.deleteImage);

// Routes pour gérer les messages de contact
router.post("/api/Contact", async (req, res) => {
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

    return res.status(201).json({ message: "Message enregistré avec succès", id });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du message:", error);
    return res.status(500).json({ message: "Erreur lors de l'enregistrement du message" });
  }
});

// Récupérer tous les messages
router.get("/admin/messages", async (req, res) => {
  try {
    const messages = await contactRepository.readAll();
    res.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des messages" });
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
    return res.status(500).json({ error: "Erreur lors de la suppression du message" });
  }
});

// Routes pour la galerie d'images
router.get("/accueil", async (req, res) => {
  try {
    const [rows] = await adminRepository.getAllImages();
    const imagesWithUrls = rows.map(image => ({
      ...image,
      filename:(image.filename) // Assurez-vous que cette fonction renvoie le bon chemin
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
    const result = await adminRepository.addImage(filename, name, author, exposure);
    res.status(201).json({
      message: "Image ajoutée avec succès",
      image: { 
        id: result.insertId, 
        filename: getImageUrl(filename), 
        name, 
        author, 
        exposure 
      },
    });
  } catch (err) {
    console.error("Erreur d'ajout de l'image:", err);
    res.status(500).json({ message: "Erreur d'ajout de l'image" });
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
    res.status(200).json({ message: "Image modifiée avec succès" });
  } catch (err) {
    console.error("Erreur de modification de l'image:", err);
    res.status(500).json({ message: "Erreur de modification de l'image" });
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


// Routes pour les galeries

// Obtenir toutes les galeries
router.get("/api/galeries", async (req, res) => {
  try {
    const galeries = await galleryRepository.getAllGalleries();
    res.json(galeries);
  } catch (error) {
    console.error("Erreur lors de la récupération des galeries:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des galeries" });
  }
});

// Obtenir une galerie spécifique avec ses images
router.get("/api/galeries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const galery = await galleryRepository.getGalleryWithImages(id);
    if (!galery) {
      return res.status(404).json({ message: "Galerie non trouvée" });
    }
    res.json(galery);
  } catch (error) {
    console.error("Erreur lors de la récupération de la galerie:", error);
    res.status(500).json({ message: "Erreur lors de la récupération de la galerie" });
  }
});

// Créer une nouvelle galerie
router.post("/api/galeries", async (req, res) => {
  const { title } = req.body;
  if( !title) {
    return res.status(400).json({ message: "Le titre est requis" });
  }
  try {
    const newGallery = await galleryRepository.createGallery(title);
    res.status(201).json(newGallery);
  } catch (error) {
    console.error("Erreur lors de la création de la galerie:", error);
    res.status(500).json({ message: "Erreur lors de la création de la galerie" });
  }
});

// Ajouter une image à une galerie
router.post("/galeries/:id/images", upload.single("file"), async (req, res) => {

  const { name, galerieId  } = req.body;
  const filename = req.file ? req.file.filename : null;

  if (!filename || !galerieId ) {
    return res.status(400).json({ message: "L'image et l'identifiant de la galerie sont requis" });
  }

  try {
    const newImage = await galleryRepository.addImageToGalery(galerieId, filename, name);
    
    res.status(201).json({
      message: "Image ajoutée à la galerie avec succès",
      image: { 
        id: newImage.id, 
        filename: getImageUrl(filename), 
        title: ''
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image à la galerie:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'image à la galerie" });
  }
});
router.get("/api/galeries/:id/images", async (req, res) => {
  const { id } = req.params;
  try {
    const images = await galleryRepository.getImagesFromGallery(id);
    if (!images || images.length === 0) {
      return res.status(404).json({ message: "Aucune image trouvée pour cette galerie" });
    }
    res.json(images);
  } catch (error) {
    console.error("Erreur lors de la récupération des images de la galerie:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des images de la galerie" });
  }
});
// Supprimer une image d'une galerie
router.delete("/api/galeries/:galleryId/images/:imageId", async (req, res) => {
  const { galleryId, imageId } = req.params;

  try {
    await galleryRepository.removeImageFromGallery(galleryId, imageId);
    res.status(200).json({ message: "Image supprimée de la galerie avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image de la galerie:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'image de la galerie" });
  }
});

// Supprimer une galerie
router.delete("/api/galeries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await galleryRepository.deleteGallery(id);
    res.status(200).json({ message: "Galerie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la galerie:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de la galerie" });
  }
});
module.exports=router