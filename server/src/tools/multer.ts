import multer from "multer";
import NewUUID from "./uuid";
import Module from "../models/module";
import User from "../models/user";
import path from 'path';  // Importer path pour gérer les chemins absolus

// Fonction asynchrone pour générer un UUID unique
async function getUUID(type: string): Promise<string> {
  let reply = "";

  while (reply === "") {
    const uuid = NewUUID(); // Générez un nouvel UUID

    if (type === 'module') {
      // Vérifier si l'UUID existe déjà dans les modules
      const user = await Module.findByPk(uuid);
      if (!user) {
        reply = uuid + ".png"; // Si le module n'existe pas, on utilise l'UUID
      }
    } else {
      // Vérifier si l'UUID existe déjà dans les utilisateurs
      const user = await User.findByPk(uuid);
      if (!user) {
        reply = uuid + ".png"; // Si l'utilisateur n'existe pas, on utilise l'UUID
      }
    }
  }

  return reply;
}

// Configuration du stockage pour les images de module
const storageModule: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // Utilisation de path.resolve pour rendre le chemin absolu
    const destinationPath = path.resolve(__dirname, '../uploads/module');
    cb(null, destinationPath); // Répertoire de destination pour les fichiers de module
  },
  filename: async (req, file, cb) => {
    try {
      const filename = await getUUID('module');
      cb(null, filename); // Renvoie le nom du fichier généré
    } catch (error) {
    }
  },
});

// Configuration du stockage pour les images de profil
const storageProfil: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // Utilisation de path.resolve pour rendre le chemin absolu
    const destinationPath = path.resolve(__dirname, '../uploads/profil');
    cb(null, destinationPath); // Répertoire de destination pour les fichiers de profil
  },
  filename: async (req, file, cb) => {
    try {
      const filename = await getUUID('profil');
      cb(null, filename); // Renvoie le nom du fichier généré
    } catch (error) {
    }
  },
});

// Middleware de Multer pour les modules et les profils
const uploadModule = multer({ storage: storageModule });
const uploadProfil = multer({ storage: storageProfil });

export { uploadModule, uploadProfil };
