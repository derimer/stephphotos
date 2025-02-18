// controllers/imageController.js
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
// Importer Multer
const ImageRepository = require("../../database/models/ImageRepository");
const tables = require("../../database/tables");

const imageRepository = new ImageRepository();

// Configuration Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "assets", "images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Utilisation d'un template literal
  },
});
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const image = await tables.images.readAll();

    // Respond with the items in JSON format
    res.json(image);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
exports.processTiffImage = async (req, res) => {
  try {
    const inputPath = req.file.path; // Chemin du fichier téléchargé
    const outputPath = `optimized/${req.file.filename}.jpeg`;

    await sharp(inputPath)
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    res.status(200).send("Image convertie et optimisée avec succès");
  } catch (error) {
    console.error("Erreur lors de la conversion de l'image :", error);
    res.status(500).send("Erreur lors de la conversion de l'image");
  }
};
const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    await imageRepository.deleteImageById(id);
    // Logique pour supprimer l'image de la base de données
    // Exemple : await adminRepository.deleteImageById(id);
    res.status(200).json({ message: "Image supprimée avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'image:", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'image" });
  }
};
// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const image = await tables.images.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (image == null) {
      res.sendStatus(404);
    } else {
      res.json(image);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const image = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.images.create(image);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// Initialiser Multer avec le stockage configuré
// eslint-disable-next-line no-unused-vars
const upload = multer({ storage });

// Route pour obtenir toutes les images
exports.getAllImages = async (req, res) => {
  try {
    const images = await imageRepository.readAll();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addImage = async (req, res) => {
  const { name, author, exposure } = req.body;
  // Vérifiez si un fichier a été téléchargé
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier téléchargé" });
  }

  const { filename } = req.file; // Multer fournit le nom du fichier

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
    return res
      .status(201)
      .json({ message: "Image ajoutée avec succès", image: newImage });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image:", error.message);
    return res.status(500).json({
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


exports.deleteImage = async (req,res) => {
    const { id } = req.params;

    try {
        // Vérifier si l'image existe dans la table accueil
        const [imageInAccueil] = await imageRepository.database.query(
            `SELECT * FROM accueil WHERE id = ?`,
            [id]
        );

        if (imageInAccueil.length > 0) {
            await imageRepository.deleteAccueilImageById(id);
            return res.json({ message: "Image supprimée de l'accueil avec succès" });
        }

        // Si l'image n'est pas dans accueil, on tente de la supprimer de la table images
        const result = await imageRepository.deleteImageById(id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Image non trouvée" });
        }

        return res.status(200).json({ message: "Image supprimée avec succès" });

    } catch (err) {
        console.error("Erreur lors de la suppression de l'image :", err);
        return res.status(500).json({ error: err.message });
    }
};


};




module.exports = {
  browse,
  read,
  // edit,
  add,
  deleteImage,
};
