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

// Middleware CORS avec gestion dynamique des origines (version simplifiée)

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000","http://vps-40561016.vps.ovh.net:3000"], // Autoriser ces origines
    methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
    credentials: true, // Si vous gérez des cookies/sessions
  })
);

// Middleware JSON
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(publicPath));
app.use("/uploads", express.static(uploadsPath));
app.get('/api/hello', (req, res) => {
  res.status(200).send('Hello from Vercel!');
});
// Test de la connexion à la base de données
app.get("/api/test", (req, res) => {
  res.json({ message:"backend fonctionne!" });
});

// Ajout des en-têtes de sécurité
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' https://fonts.googleapis.com https://www.gstatic.com; img-src 'self' https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com;"
  );
  next();
});

// Vérifiez si le router est valide avant de l'utiliser
if (router && typeof router === "function") {
  app.use("/api", router);
} else {
  console.error(
    "Le router importé n'est pas valide. Vérifiez son exportation."
  );
}

// Middleware pour gérer les routes inexistantes
app.use((req, res) => {
  res.status(404).send("Route non trouvée");
});

// Si vous exécutez ce fichier directement, démarrez le serveur
if (require.main === module) {
  app
    .listen(port, () => {
      console.info(`Server is listening on port ${port}`);
      db.checkConnection(); // Vérifiez la connexion à la base de données au démarrage
    })
    .on("error", (err) => {
      console.error("Error:", err.message);
    });
}

module.exports = app;
