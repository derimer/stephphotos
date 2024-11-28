# Utilisation d'une image de base (par exemple Node.js pour une application Node)
FROM node:14

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie des fichiers de l'application dans le conteneur
COPY . .

# Exposition du port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]