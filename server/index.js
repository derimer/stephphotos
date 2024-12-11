// Load environment variables from .env file
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const Router = require("./app/routers/api/router");

const db = require("./database/client");

// Importez le fichier tables.js

const app = express();
const port = process.env.APP_PORT || 3310;

// Configuration des chemins
const publicPath = path.join(__dirname, "public");
const uploadsPath = path.join(publicPath, "uploads");

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(publicPath));
app.use("/uploads", express.static(uploadsPath));

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

// Utiliser le router API
app.use("/api", Router);

// Démarrage du serveur
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
    db.checkConnection(); // Vérifiez la connexion à la base de données au démarrage
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });

module.exports = db;
