# Utiliser une image de base officielle de Node.js
FROM node:18

USER root

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port que l'application va utiliser
EXPOSE 3000

# Démarrer l'application
CMD ["node", "app.js"]
