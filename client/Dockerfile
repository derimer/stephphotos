FROM node:20-alpine

# Créer un répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de dépendance
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le répertoire server (sans node_modules)
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm install

# Copier le répertoire client (sans node_modules)
COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm install

# Copier le reste de l'application
COPY server ./server
COPY client ./client

# Exposer le port de l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
