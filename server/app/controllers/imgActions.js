// controllers/imageController.js
const path = require("path");
const multer = require("multer");
// Importer Multer
const ImageRepository = require("../../database/models/ImageRepository");

const imageRepository = new ImageRepository();

// Configuration Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'assets', 'images'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
       uniqueSuffix + path.extname(file.originalname)
    ); // Générer un nom de fichier unique
  },
});

const upload = multer({ storage: storage }); // Initialiser Multer avec le stockage configuré

// Route pour obtenir toutes les images
exports.getAllImages = async (req, res) => {
  try {
    const images = await imageRepository.readAll();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
exports.addImage = async (req, res) => {
    const { name, author, exposure } = req.body;
    console.log("Fichier reçu:", req.file);
    console.log("Données reçues:", req.body);
    
    // Vérifiez si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }

    const filename = req.file.filename; // Multer fournit le nom du fichier

    // Vérifiez si tous les champs nécessaires sont remplis
    if (!filename || !name || !author || !exposure) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
      // Crée une entrée dans la base de données
      const id = await imageRepository.create({
        filename,
        name,
        author,
        exposure,
      });
      const newImage = await ImageRepository.read(id);
      res.status(201).json({ message: "Image ajoutée avec succès", image: newImage });
      res.status(201).json({ message: "image ajoutée avec succès",image:newImage });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image:", error.message);
      res.status(500).json({
        message: "Erreur lors de l'ajout de l'image",
        error: error.message,
      });
    }
  }
    */
exports.addImage = async (req, res) => {
  const { name, author, exposure } = req.body;
  console.log("Fichier reçu:", req.file);
  console.log("Données reçues:", req.body);

  // Vérifiez si un fichier a été téléchargé
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier téléchargé" });
  }

  const filename = req.file.filename; // Multer fournit le nom du fichier

  // Vérifiez si tous les champs nécessaires sont remplis
  if (!filename || !name || !author || !exposure) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Crée une entrée dans la base de données
    const id = await imageRepository.create({
      filename,
      name,
      author,
      exposure,
    });

    // Récupère la nouvelle image créée
    const newImage = await imageRepository.read(id);

    // Envoie une seule réponse avec l'image ajoutée
    res
      .status(201)
      .json({ message: "Image ajoutée avec succès", image: newImage });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image:", error.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'image",
      error: error.message,
    });
  }
};
exports.getAccueilImage = async (req, res) => {
  try {
    const image = await imageRepository.readRandomImage(); // Supposons que vous avez une fonction qui renvoie une image aléatoire
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: "Aucune image trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Route pour supprimer une image
exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    // Suppression de l'image dans la base de données
    await imageRepository.delete(id);
    res.json({ message: "Image supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};