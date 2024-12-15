#!/usr/bin/env sh

# Arrêter le script en cas d'erreur
set -e

# Afficher un message indiquant le début des migrations
echo "Démarrage des migrations..."

# Exécuter les migrations
cd ./server && node ./bin/migrate.js

# Afficher un message indiquant que les migrations sont terminées
echo "Migrations terminées. Démarrage du serveur..."

# Démarrer l'application
exec node index.js
