//Express
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
//Model & bdd
import { User } from "../models/user";
import { Module } from "../models/module";
import { Op } from "sequelize";
//Controller
import UserController from "../controller/user";
//Tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import Image from "../tools/multer";
import config from "config";

//Middleware
import auth from "../middleware/auth/auth";
import role from "../middleware/role";

const image: number = config.get("storage.nombreImageBanque");

interface AuthRequest extends Request {
    user?: { id: string }; // Ajout d'un champ user dans req
}

// Création d'un nouvel utilisateur
router.post("/", auth, role, async (req: Request, res: Response) => {
    const data = req.body;
    try {
        await UserController.add(data);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Selection de tout les utilisateurs
router.get("/", auth, role, async (req: Request, res: Response) => {
    try {
        const user = await UserController.getAll();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Selection d'un utilisateur
router.get("/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await UserController.getOne(userId);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Modification d'un utilisateur
router.put("/:id", auth, async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        await UserController.update(userId, userData);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

//Suppression d'un utilisateur
router.delete(
    "/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await User.findByPk(req.params.id);

            if (!data) {
                res.status(404).json({ message: "Utilisateur introuvable." });
                return;
            }
            const user = data.get();
            const Modules = await Module.findAll({
                where: { user_id: data.id },
            });

            Modules.forEach(async (module) => {
                const fileDelete = path.join(
                    "./src/uploads/module/",
                    module.image
                );
                try {
                    await fs.promises.unlink(fileDelete);
                } catch (err) {
                    res.status(500).json({
                        message:
                            "Erreur lors de la suppression de l'image du/des modules.",
                        error: err,
                    });
                    return;
                }
            });

            if (!user.image.includes("bank")) {
                const fileDelete = path.join(
                    "./src/uploads/profil/",
                    user.image
                );

                try {
                    await fs.promises.unlink(fileDelete);
                } catch (err) {
                    res.status(500).json({
                        message:
                            "Erreur lors de la suppression de l'image de l'utilisateur.",
                        error: err,
                    });
                    return;
                }
            }
            await Module.destroy({ where: { user_id: data.id } });
            await User.destroy({ where: { id: data.id } });
            res.status(200).json({ message: "Utilisateur supprimé." });
            return;
        } catch (error) {
            console.error("Erreur serveur :", error);
            res.status(500).json({
                message: "Erreur serveur.",
                erreur: error,
            });
            return;
        }
    }
);

//Filtre utilisateur
router.post("/filtre", auth, async (req: Request, res: Response) => {
    const search = req.body.search;
    try {
        const user = await UserController.filtre(search);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

//Update photo utilisateur
router.patch(
    "/image",
    auth,
    Image.getUploadProfil().single("image"),
    Image.resizeImage,
    async (req: Request, res: Response) => {
        const userData = req.body;
        const file = req.file;
        try {
            await UserController.image(userData, file!);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur." });
        }
    }
);

// Update password utilisateur
router.patch(
    "/password",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const userId = req.user?.id;
        const data = req.body;
        try {
            await UserController.password(userId!, data);
            const user = await User.findByPk(req.body.id);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

export default router;
