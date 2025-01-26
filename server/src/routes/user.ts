//Express
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
//Model & bdd
import User from "../models/user";
import Module from "../models/module";
import Statut from "../models/statut";
import { Op } from "sequelize";
//Tools
import { hash, compare } from "../tools/hash";
import NewUUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import { uploadProfil, resizeimg } from "../tools/multer";
import config from "config";
//Middleware
import auth from "../middleware/auth/auth";
import role from "../middleware/role";

const image: number = config.get("storage.nombreImageBanque");

// Création d'un nouvel utilisateur
router.post("/add", auth, role, async (req: Request, res: Response) => {
    const data = req.body;
    data.id = NewUUID();
    if (data.image == undefined) {
        data.image = "bank-img-" + Math.trunc(Math.random() * image) + ".png";
    }

    User.create(data)
        .then(async (user) => {
            const userData = user.get();
            userData.password = await hash(userData.password);
            await User.update(userData, {
                where: { id: userData.id },
                validate: false,
            });
            res.status(201).json({
                message: "Utilisateur créé avec succès.",
                user,
            });
        })
        .catch((error) => {
            if (error.name === "SequelizeValidationError") {
                const errors = error.errors.map(
                    (err: { message: any }) => err.message
                );
                return res.status(401).json({ errors });
            }
            res.status(501).json({ message: "Erreur serveur.", erreur: error });
        });
});

// Selection de tout les utilisateurs
router.get("/", auth, role, (req: Request, res: Response) => {
    User.findAll({
        order: [["createdAt", "desc"]],
    })
        .then((user) => {
            res.status(201).json({ message: "Tout les utilisateurs.", user });
        })
        .catch((error) => {
            res.status(501).json({ message: "Erreur serveur.", erreur: error });
        });
});

// Selection d'un utilisateur
router.get("/:id", auth, (req: Request, res: Response) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((user) => {
            if (user) {
                res.status(201).json({ message: "Utilisateur trouvé.", user });
            } else {
                res.status(404).json({ message: "Utilisateur introuvable." });
            }
        })
        .catch((error) => {
            res.status(501).json({ message: "Erreur serveur.", erreur: error });
        });
});

// Modification d'un utilisateur
router.post("/update/:id", auth, (req: Request, res: Response) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id },
    })
        .then((_) => {
            return User.findByPk(id).then((user) => {
                if (user === null) {
                    res.status(404).json({
                        message: "Utilisateur introuvable.",
                    });
                }
                res.status(201).json({ message: "Utilisateur modifié.", user });
            });
        })
        .catch((error) => {
            res.status(501).json({ message: "Erreur serveur.", erreur: error });
        });
});

//Suppression d'un utilisateur
router.post(
    "/delete/:id",
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
                    res.status(503).json({
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
                    res.status(502).json({
                        message:
                            "Erreur lors de la suppression de l'image de l'utilisateur.",
                        error: err,
                    });
                    return;
                }
            }
            await Module.destroy({ where: { user_id: data.id } });
            await User.destroy({ where: { id: data.id } });
            res.status(201).json({ message: "Utilisateur supprimé." });
            return;
        } catch (error) {
            console.error("Erreur serveur :", error);
            res.status(501).json({
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
    User.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.like]: "%" + search + "%" } },
                { mail: { [Op.like]: "%" + search + "%" } },
            ],
        },
    })
        .then((user) => {
            res.status(200).json({ message: "Utilisateur trouvé.", user });
        })
        .catch((error) => {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        });
});

//Update photo utilisateur
router.post("/updateImg", auth, async (req: Request, res: Response) => {
    uploadProfil.single("image")(req, res, async (err) => {
        // Vérification des erreurs
        if (err) {
            return res.status(500).json({
                message: "Erreur lors de l'upload de l'image.",
                error: err.message,
            });
        }
        if (!req.file) {
            return res
                .status(400)
                .json({ message: "Aucun fichier n'a été téléchargé." });
        }

        try {
            await resizeimg(req, res, async (resizeError) => {
                if (resizeError) {
                    return res.status(500).json({
                        message: "Erreur lors de la compression de l'image.",
                        error: resizeError.message,
                    });
                }

                const user = await User.findOne({ where: { id: req.body.id } });
                const userData = user!.get();
                if (!userData.image.includes("bank")) {
                    const fileDelete = path.join(
                        "./src/uploads/profil/",
                        userData.image
                    );
                    try {
                        await fs.promises.unlink(fileDelete);
                    } catch (err) {
                        console.error(
                            "Erreur lors de la suppression du fichier :",
                            err
                        );
                        res.status(500).json({
                            message:
                                "Erreur lors de la suppression du fichier.",
                            error: err,
                        });
                        return;
                    }
                }
                const filePath = req.file!.path;
                const fileName = req.file!.filename;

                await User.update(
                    { image: fileName },
                    {
                        where: { id: req.body.id },
                    }
                );

                res.status(200).json({
                    message: "Image téléchargée et compressée avec succès.",
                    file: {
                        path: filePath,
                        name: fileName,
                    },
                });
            });
        } catch (resizeError: unknown) {
            if (resizeError instanceof Error) {
                return res.status(500).json({
                    message:
                        "Erreur inattendue lors de la compression de l'image.",
                    error: resizeError.message,
                });
            } else {
                return res.status(500).json({
                    message: "Erreur inconnue lors de la compression.",
                });
            }
        }
    });
});

//Update password utilisateur
router.post(
    "/password",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findByPk(req.body.id);

            if (user === null) {
                res.status(404).json({ message: "Utilisateur introuvable." });
                return;
            }

            const isPasswordValid = await compare(
                req.body.password,
                user.password
            );

            if (!isPasswordValid) {
                res.status(402).json({
                    message: "Mot de passe incorrect.",
                });
                return;
            }
            if (req.body.newPassword.length < 8) {
                res.status(405).json({
                    message:
                        "Le mot de passe doit avoir au moins 8 caractères.",
                });
                return;
            }

            if (req.body.newPassword != req.body.confirmPassword) {
                res.status(403).json({
                    message: "Les mots de passe ne correspondent pas.",
                });
                return;
            }

            let password: string = await hash(req.body.newPassword);
            User.update(
                { password: password },
                {
                    where: { id: user.id },
                }
            )
                .then((user) => {
                    res.status(200).json({
                        message: "Mot de passe modifié.",
                        user,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: "Erreur serveur.",
                        erreur: error,
                    });
                });
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
            return;
        }
    }
);

//test
router.post("/test", async (req: Request, res: Response) => {
    const id = req.body.id;
    User.findOne({
        where: { id: id },
    })
        .then((user) => {
            res.status(200).json({ message: "Utilisateur trouvé.", user });
        })
        .catch((error) => {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        });
});

//Renvoie de toute les routes
export default router;
