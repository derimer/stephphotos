// Load environment variables from .env file
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const apiRouter = require("./app/routers/api/router");
const tables = require("./database/tables");

const db = require("./database/client");

 // Importez le fichier tables.js
 

const app = express();
const port = process.env.APP_PORT || 3310;

// Configuration des chemins
const publicPath = path.join(__dirname, 'public');
const uploadsPath = path.join(publicPath, 'uploads');

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(publicPath));
app.use('/uploads', express.static(uploadsPath));
console.log("Chemin des uploads :", uploadsPath);

// Routes pour les galeries
app.get("/api/galeries", async (req, res) => {
  try {
    const galeries = await tables.galeries.getAllGaleries();
    res.json(galeries);
  } catch (error) {
    console.error("Erreur lors de la récupération des galeries:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des galeries" });
  }
});

app.get("/api/galeries/:id", async (req, res) => {
  try {
    const galery = await tables.galeries.getGaleryWithImages(req.params.id);
    if (!galery||galery.length===0) {
      return res.status(404).json({ error: "Galerie non trouvée" });
    }
    res.json(galery);
  } catch (error) {
    console.error("Erreur lors de la récupération de la galerie:", error);
    return res.status(500).json({ error: "Erreur lors de la récupération de la galerie" });
  }
});

app.get("/api/galeries/:id/images", async (req, res) => {
  try {
    const images = await tables.galeries.getImagesFromGallery(req.params.id);
    if (!images || images.length === 0) {
      return res.status(404).json({ error: "Aucune image trouvée pour cette galerie" });
    }
    res.json(images);
  } catch (error) {
    console.error("Erreur lors de la récupération des images de la galerie:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des images de la galerie" });
  }
});
app.post("/api/galeries", async (req, res) => {
  try {
    const { id,title} = req.body;
    const newGalery = await tables.galeries.createGalery(id, title);
    res.status(201).json(newGalery);
  } catch (error) {
    console.error("Erreur lors de la création de la galerie:", error);
    res.status(500).json({ error: "Erreur lors de la création de la galerie" });
  }
});

app.delete("/api/galeries/:galleryId/images/:imageId", async (req, res) => {
  try {
    await tables.galeries.removeImageFromGalery(req.params.galleryId, req.params.imageId);
    res.status(200).json({ message: "Image supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'image" });
  }
});

app.delete("/api/galeries/:id", async (req, res) => {
  try {
    await tables.galeries.deleteGalery(req.params.id);
    res.status(200).json({ message: "Galerie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la galerie:", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la galerie" });
  }
});

// Test de la connexion à la base de données
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({ message: "Connexion à la base de données réussie", data: rows });
  } catch (error) {
    res.status(500).json({
      message: "Erreur de connexion à la base de données",
      error: error.message,
    });
  }
});

// Route pour enregistrer un message de contact
app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  try {
    await tables.Contact.create({ firstName, lastName, email, message });
    res.status(201).send("Message reçu et enregistré !");
  } catch (error) {
    console.error("Erreur lors de l'insertion du message:", error);
    res.status(500).send("Erreur lors de l'enregistrement du message !");
  }
});

// Route pour afficher une image aléatoire
app.get("/api/random-image", async (req, res) => {
  try {
    const randomImage = await tables.images.getRandomImage();
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


// Utiliser le router API
app.use("/api", apiRouter);

// Démarrage du serveur
app.listen(port, () => {
  console.info(`Server is listening on port ${port}`);
  db.checkConnection(); // Vérifiez la connexion à la base de données au démarrage
}).on("error", (err) => {
  console.error("Error:", err.message);
});

module.exports = db;