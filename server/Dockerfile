# Utilisez l'image officielle Node.js comme image de base
FROM node:16

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel votre serveur Node.js fonctionne
EXPOSE 5000

# Commande pour démarrer le serveur
CMD ["npm", "run", "dev"]
