// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite";
// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  root: "./", // Définit la racine du projet
  build: {
    outDir: "client/dist", // Dossier de sortie pour les fichiers construits
  },
  server: {
    port: 3000, // Définit le port du serveur de développement
  },
  esbuild: {
    loader: "jsx", // Définit le loader pour JSX
    include: /src\/.*\.jsx?$/, // Inclut les fichiers JSX dans src
    exclude: [], // Aucune exclusion supplémentaire
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx", // Charge les fichiers JS comme JSX
      },
    },
  },
  base: mode === "production" ? "./" : "/", // Définit le chemin de base pour la production
}));
