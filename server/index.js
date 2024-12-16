// Load environment variables from .env file
require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

// Assurez-vous que le fichier router exporte un objet express.Router()
const router = require("./app/routers/api/router");

const db = require("./database/client");

// Initialisation de l'application Express
const app = express();
const port = process.env.APP_PORT || 3001;

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
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' https://fonts.googleapis.com https://www.gstatic.com; img-src 'self' https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com;");
  next();
});

// Vérifiez si le router est valide avant de l'utiliser
if (router && typeof router === "function") {
  app.use("/api", router);
} else {
  console.error("Le router importé n'est pas valide. Vérifiez son exportation.");
}

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