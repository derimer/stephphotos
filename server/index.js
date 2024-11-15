// Load environment variables from .env file
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const apiRouter = require("./app/routers/api/router");
const db = require("./database/client");

const app = express();
const port = process.env.APP_PORT || 3310;

// Configuration des chemins
const publicPath = path.join(__dirname, 'public');
const uploadsPath = path.join(publicPath, 'uploads');

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(publicPath)); // Sert tous les fichiers dans le dossier public
app.use('/uploads', express.static(uploadsPath)); // Sert les fichiers dans le dossier uploads

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

// Route pour récupérer les galeries

// Route pour enregistrer un message de contact
app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  try {
    await db.query(
      "INSERT INTO Contact (firstName, lastName, email, message) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, message]
    );
    res.status(201).send("Message reçu et enregistré !");
  } catch (error) {
    console.error("Erreur lors de l'insertion du message:", error);
    res.status(500).send("Erreur lors de l'enregistrement du message !");
  }
});

// Route pour afficher une image aléatoire
app.get("/api/random-image", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM images ORDER BY RAND() LIMIT 1");
    if (rows.length === 0) {
      return res.status(404).json({ error: "Aucune image trouvée" });
    }

    const { filename } = rows[0];
    
    // Utilisez le bon chemin pour l'image
    const imageWithUrl = {
      ...rows[0],
      imageUrl: `/uploads/${filename}`, // Modifié ici pour correspondre au bon chemin
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
}).on("error", (err) => {
  console.error("Error:", err.message);
});

module.exports = db;