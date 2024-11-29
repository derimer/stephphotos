// Load the express module to create a web application

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

const apiRouter = require("./routers/api/router");

app.use("/api", apiRouter);

const reactBuildPath = path.join(__dirname, "../../client/build");
const publicFolderPath = path.join(__dirname, "../public");

app.use(express.static(reactBuildPath));
app.use("/assets", express.static(path.join(publicFolderPath, "assets"), { maxAge: "1y" }));

// Route pour envoyer un email
app.post("/send-email", (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  // Logique pour l'envoi d'email
  res.status(200).send("Email envoyé avec succès !");
});

// Route pour la page d'accueil
app.get("/api/accueil", (req, res) => {
  const images = []; // Remplacez par des données réelles
  res.json(images);
});

// Route pour gérer les erreurs non prises en charge
app.get("*", (_, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

// Middleware de gestion des erreurs
app.use((err, req, res) => {
  console.error("Erreur:", err);
  res.status(500).json({ error: "Erreur serveur" });
});

module.exports = app;
