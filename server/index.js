require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

// Assurez-vous que le fichier router exporte un objet express.Router()
const router = require("./app/routers/api/router");
const db = require("./database/client");

// Initialisation de l'application Express
const app = express();
const port = process.env.PORT || 3310; // ✅ Utilisation de PORT pour être cohérent avec systemd

// Configuration des chemins
const publicPath = path.join(__dirname, "public");
const uploadsPath = path.join(publicPath, "uploads");

// Middleware CORS avec gestion dynamique des origines
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://vps-40561016.vps.ovh.net:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Servir les fichiers statiques
app.use(express.static(publicPath));
app.use("/api/uploads", express.static(uploadsPath));

// Routes simples de test
app.get("/api/hello", (req, res) => {
  res.status(200).send("Hello from Stephano Valentino API!");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "backend fonctionne!" });
});

// Ajout des en-têtes de sécurité
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' https://fonts.googleapis.com https://www.gstatic.com; img-src 'self' https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com;"
  );
  next();
});

// Router API
if (router && typeof router === "function") {
  app.use("/api", router);
} else {
  console.error("Le router importé n'est pas valide. Vérifiez son exportation.");
}

// Middleware pour gérer les routes inexistantes
app.use((req, res) => {
  res.status(404).send("Route non trouvée");
});

// ✅ Démarrage du serveur sans condition
app.listen(port, "0.0.0.0", () => {
  console.info(`✅ Server is listening on port ${port}`);
  db.checkConnection();
});

module.exports = app;
