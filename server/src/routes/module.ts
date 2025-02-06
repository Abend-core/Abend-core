//Express
import express, { Request, Response } from "express";
const router = express.Router();
//Tools
import UUID from "../tools/uuid";
import Image from "../tools/multer";
import Redis from "../tools/redis";
//Model & bdd
import Module from "../models/module";
import User from "../models/user";
//Middleware
import auth from "../middleware/auth/auth";
import ModuleController from "../controller/module";
interface AuthRequest extends Request {
    user?: { id: string }; // Ajout d'un champ user dans req
}

// Création d'un nouveau module
router.post("/", auth, async (req, res) => {
    const data = req.body;
    const link: string = req.body.link;
    const response: string = checkLink(link);
    data.id = UUID.v7();

    data.isShow = true;
    if (response != "ok") {
        res.status(400).json({
            message: "Le lien ne correspond pas au format attendu.",
        });
        return;
    }

    Module.create(data)
        .then(async (module) => {
            res.status(200).json({
                message: "Module créé avec succès.",
                module,
            });
        })
        .catch((error) => {
            if (error.name === "SequelizeValidationError") {
                const errors = error.errors.map(
                    (err: { message: any }) => err.message
                );
                return res.status(400).json({ errors });
            }
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        });
});

// Ajout d'une image a un module.
router.put("/image", auth, (req, res) => {
    Image.getUploadModule().single("image")(req, res, async (err) => {
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
            await Image.resizeImage(req, res, async (resizeError) => {
                if (resizeError) {
                    return res.status(500).json({
                        message: "Erreur lors de la compression de l'image.",
                        error: resizeError.message,
                    });
                }

                const filePath = req.file!.path;
                const fileName = req.file!.filename;

                await Module.update(
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

router.get("/show", auth, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    try {
        const modules = await ModuleController.show(userId!);
        res.status(200).json({ message: "Tous les modules.", modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Selection de tout les modules invisible
router.get("/hide", auth, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    try {
        const modules = await ModuleController.hide(userId!);
        res.status(200).json({ message: "Tous les modules.", modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Selection de tout les modules
router.get("/", async (req, res) => {
    try {
        const modules = await Module.findAll({
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["username", "isAdmin"],
                },
            ],
        });

        res.status(200).json({ message: "Tout les modules.", module: modules });
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "SequelizeValidationError") {
                const errors = (error as any).errors?.map(
                    (err: { message: any }) => err.message
                );
                res.status(400).json({ errors });
            }
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
});

// Selection des modules de l'utilisateur connecté
router.get("/user", auth, async (req: AuthRequest, res) => {
    const idUser = req.user?.id;
    try{
        const modules = await ModuleController.getModule(idUser!);
        res.status(200).json({ modules });
    }catch(error){
        res.status(500).json({
            message: "Erreur serveur.",
            erreur: error,
        });
    }
});

// Modification d'un module
router.put("/:id", auth, (req, res) => {
    const id = req.params.id;
    Module.update(req.body, {
        where: { id: id },
    })
        .then((_) => {
            return Module.findByPk(id).then(async (module) => {
                if (module === null) {
                    res.status(404).json({ message: "Module introuvable." });
                }

                res.status(200).json({ message: "Module modifié.", module });
            });
        })
        .catch((error) => {
            if (error.name === "SequelizeValidationError") {
                const errors = error.errors.map(
                    (err: { message: any }) => err.message
                );
                return res.status(400).json({ errors });
            }
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        });
});

//Suppression d'un module
router.delete("/:id", auth, async (req, res) => {
    const moduleId = req.params.id;
    try {
        await ModuleController.delete(moduleId);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

//Filtre module
router.post("/filtre", async (req, res) => {
    const search: string = req.body.search;
    try {
        const module = await ModuleController.filtre(search);
        res.status(200).json({ message: "Module trouvé.", module });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

//Recuperation de toute les informations d'un utilisateur (info user/info modules/favoris)
router.get("/user/:username", auth, async (req, res) => {
    const userName = req.params.username;
    try{
        const userData = await ModuleController.getUserData(userName)
        res.status(200).json({ message: "Modules trouvés.", userData });
    }catch (error){
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Ajoute en favoris le module
router.post("/liked/:id", auth, async (req: AuthRequest, res: Response) => {
    const UserId = req.user?.id;
    const ModuleId = req.params.id;
    try {
        await ModuleController.toggleLike(UserId!, ModuleId);
        res.status(200);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Ajoute en visite le module
router.post("/visited", auth, async (req: AuthRequest, res) => {
    const UserId = req.user?.id;
    const ModuleId = req.params.id;
    try {
        await ModuleController.toggleView(UserId!, ModuleId);
        res.status(200);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Sélection de tous les modules mis en favoris par l'utilisateur
router.get("/liked", auth, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    try {
        const modules = await ModuleController.moduleLikeByUser(userId!);
        res.status(200).json({ message: "Tous les modules.", modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

function checkLink(link: string): string {
    let message: string = "ok";
    if (link.includes("https://") == false) {
        message = "Le lien n'est pas au bon format.";
        return message;
    }
    const parts = link.split("//");
    if (parts[0] != "https:") {
        message = "Le lien n'est pas au bon format.";
        return message;
    }

    const domainExtension = parts[1];
    const split = domainExtension.split(".");
    for (let i = 0; i < split.length - 1; i++) {
        message = blackList(split[i]);
    }
    if (message != "ok") {
        return message;
    }
    message = goodList(split[split.length - 1]);

    return message;
}

function goodList(text: string): string {
    const listeExtension: Array<string> = [
        "fr",
        "com",
        "org",
        "app",
        "net",
        "pt",
        "es",
        "pro",
        "de",
        "ru",
        "ir",
        "in",
        "uk",
        "au",
        "ua",
        "tv",
        "de",
        "online",
        "info",
        "eu",
        "tk",
        "cn",
        "xyz",
        "site",
        "top",
        "icu",
    ];

    const containsExtension = listeExtension.some((extension) =>
        text.includes(extension)
    );
    if (!containsExtension) {
        return "Le lien n'est pas au bon format.";
    }

    return "ok";
}

function blackList(text: string): string {
    const listeDomaine: Array<string> = [
        "porn",
        "porno",
        "sexe",
        "adult",
        "xxx",
        "sex",
        "onlyfans",
        "escort",
        "camgirl",
        "casino",
        "gambling",
        "bet",
        "poker",
        "ads",
    ];
    // Construire une expression régulière pour détecter des mots interdits
    const regex = new RegExp(`\\b(${listeDomaine.join("|")})\\b`, "i");

    // Vérifier si le texte correspond à la liste des mots interdits
    if (regex.test(text)) {
        return "Le lien n'est pas au bon format.";
    }

    return "ok";
}

export default router;
