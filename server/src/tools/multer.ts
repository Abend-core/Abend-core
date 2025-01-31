import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import UUID from "./uuid";
import path from "path";
import fs from "fs/promises";

const storageModule: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.resolve(__dirname, "../uploads/module");
        cb(null, destinationPath);
    },
    filename: async (req, file, cb) => {
        try {
            const filename: string = UUID.v7();
            cb(null, filename);
        } catch (error) {}
    },
});

const storageProfil: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.resolve(__dirname, "../uploads/profil");
        cb(null, destinationPath);
    },
    filename: async (req, file, cb) => {
        try {
            const filename: string = UUID.v7();
            cb(null, filename);
        } catch (error) {}
    },
});

const resizeimg = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.file) {
            return next(new Error("Aucun fichier téléchargé."));
        }

        const filePath = req.file.path; // Chemin du fichier téléchargé
        const tempFilePath = path.join(
            req.file.destination,
            "temp_" + req.file.filename // Nouveau chemin temporaire pour l'image recadrée
        ); // Chemin temporaire pour l'image après le recadrage

        const resizedPath = path.join(
            req.file.destination,
            req.file.filename + ".png"
        ); // Chemin final pour l'image redimensionnée

        // Charger l'image et obtenir ses dimensions
        const metadata = await sharp(filePath).metadata();
        const width = metadata.width;
        const height = metadata.height;

        // Calculer la taille du carré
        const size = Math.min(width!, height!);

        // Calculer les coordonnées pour centrer le carré
        const left = (width! - size) / 2;
        const top = (height! - size) / 2;

        // Recadrer l'image pour qu'elle soit carrée et sauvegarder temporairement
        await sharp(filePath)
            .extract({
                left: Math.floor(left),
                top: Math.floor(top),
                width: size,
                height: size,
            })
            .toFile(tempFilePath); // Sauvegarder l'image recadrée dans un fichier temporaire

        // Redimensionner l'image recadrée à 256x256 et enregistrer
        await sharp(tempFilePath)
            .resize(256, 256) // Dimensions de redimensionnement fixes
            .toFile(resizedPath); // Enregistrer l'image redimensionnée

        // Supprimer les fichiers temporaires après traitement
        await fs.unlink(filePath); // Supprimer l'image d'origine
        await fs.unlink(tempFilePath); // Supprimer le fichier temporaire

        // Mettre à jour les informations du fichier pour Multer
        req.file.path = resizedPath;
        req.file.filename = req.file.filename + ".png";

        next();
    } catch (error) {
        next(error);
    }
};

const uploadModule = multer({ storage: storageModule });
const uploadProfil = multer({ storage: storageProfil });

export { uploadModule, uploadProfil, resizeimg };
