require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const router = require("./app/routers/api/router");
const db = require("./database/client");

const app = express();
const port = process.env.APP_PORT || 3001;

// Middleware CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://vps-40561016.vps.ovh.net:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware JSON et urlencoded
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Sécurité (CSP)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' https://fonts.googleapis.com https://www.gstatic.com; img-src 'self' https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com;"
  );
  next();
});

// --------------------------------------
// SERVIR LE CLIENT VITE (React build)
// --------------------------------------
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// Toutes les autres routes renvoient index.html pour React Router
app.get("*", (req, res, next) => {
  // Ignorer les routes API
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// --------------------------------------
// Routes API
// --------------------------------------
if (router && typeof router === "function") {
  app.use("/api", router);
} else {
  console.error("Le router importé n'est pas valide.");
}

// Routes test et uploads statiques
const publicPath = path.join(__dirname, "public");
const uploadsPath = path.join(publicPath, "uploads");
app.use(express.static(publicPath));
app.use("/api/uploads", express.static(uploadsPath));

app.get("/api/hello", (req, res) => res.send("Hello from Vercel!"));
app.get("/api/test", (req, res) => res.json({ message: "backend fonctionne!" }));

// 404 pour API
app.use((req, res) => {
  res.status(404).send("Route non trouvée");
});

// Démarrage serveur
if (require.main === module) {
  app
    .listen(port, () => {
      console.info(`Server is listening on port ${port}`);
      db.checkConnection();
    })
    .on("error", (err) => console.error("Error:", err.message));
}

module.exports = app;
