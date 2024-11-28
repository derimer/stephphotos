# Utiliser une image de base Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY client/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY client/ .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]