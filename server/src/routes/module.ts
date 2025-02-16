// Express
import express, { Request, Response } from "express";
const router = express.Router();
// Tools
import Image from "../tools/multer";

// Middleware
import auth from "../middlewares/auth/auth";

// Controller
import ModuleController from "../controllers/module";
import TagsController from "../controllers/tags";

//Validator
import ModuleValidator from "../validators/module";
interface AuthRequest extends Request {
    user?: { id: string };
}

// Création d'un nouveau module
router.post(
    "/",
    auth,
    Image.getUploadModule().single("image"),
    Image.resizeImage,
    async (req, res) => {
        const [found, error] = await Promise.all([
            ModuleValidator.hasFile(req.file!),
            ModuleValidator.data(req.body),
        ]);
        console.log("Ce que je recois : ", req.body)
        if (found) {
            res.status(404).json({ erreur: found });
            return;
        }
        if (error) {
            res.status(400).json({ erreur: error });
            return;
        }
        try {
            await ModuleController.add(req.body, req.file!);
            if (req.body.tags) {
                await TagsController.add(req.body.tags);
            }

            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

router.get("/showAdmin", async (req, res) => {
    try {
        const modules = await ModuleController.showAdmin();
        res.status(200).json({ modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

router.get("/show", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.show(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Selection de tout les modules invisible
router.get("/hide", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.hide(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Selection de tout les modules
router.get("/", async (req, res) => {
    try {
        const modules = await ModuleController.getAll();
        res.status(200).json({ module: modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Selection des modules de l'utilisateur connecté
router.get("/user", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.getModule(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur.",
            erreur: error,
        });
    }
});

// Modification d'un module
router.patch("/:id", auth, async (req, res) => {
    const [found, error] = await Promise.all([
        ModuleValidator.foundModule(req.params.id),
        ModuleValidator.data(req.body),
    ]);
    if (!found) {
        res.status(404).json();
        return;
    }

    if (error) {
        res.status(400).json({ erreur: error });
        return;
    }
    try {
        await ModuleController.update(req.params.id, req.body);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

//Suppression d'un module
router.delete("/:id", auth, async (req, res) => {
    const found = await ModuleValidator.foundModule(req.params.id);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        await ModuleController.delete(req.params.id);
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
        res.status(200).json({ module });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

//Recuperation de toute les informations d'un utilisateur (info user/info modules/favoris)
router.get("/user/:username", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUserByUsername(
        req.params.username
    );
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const userData = await ModuleController.getUserData(
            req.user?.id!,
            req.params.username
        );
        res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Ajoute en favoris le module
router.post("/liked/:id", auth, async (req: AuthRequest, res: Response) => {
    const [foundUser, foundModule] = await Promise.all([
        ModuleValidator.foundUser(req.user?.id!),
        ModuleValidator.foundModule(req.params.id),
    ]);

    if (!foundModule || !foundUser) {
        res.status(404).json();
        return;
    }
    try {
        await ModuleController.toggleLike(req.user?.id!, req.params.id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Ajoute en visite le module
router.post("/visited/:id", auth, async (req: AuthRequest, res) => {
    const [foundUser, foundModule] = await Promise.all([
        ModuleValidator.foundUser(req.user?.id!),
        ModuleValidator.foundModule(req.params.id),
    ]);
    if (!foundModule || !foundUser) {
        res.status(404).json();
        return;
    }
    try {
        await ModuleController.toggleView(req.user?.id!, req.params.id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Sélection de tous les modules mis en favoris par l'utilisateur
router.get("/liked", auth, async (req: AuthRequest, res) => {
    const found = ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.moduleLikeByUser(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Changement de l'état d'un module en alerte
router.post("/reported/:id", auth, async (req: AuthRequest, res) => {
    const [foundUser, foundModule] = await Promise.all([
        ModuleValidator.foundUser(req.user?.id!),
        ModuleValidator.foundModule(req.params.id),
    ]);
    if (!foundModule || !foundUser) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.toggleReport(
            req.user?.id!,
            req.params.id
        );
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Affiche les modules qui ont été report
router.get("/reported", auth, async (req: AuthRequest, res) => {
    try {
        const modules = await ModuleController.getReported();
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Affiche les tags
router.get("/tags", auth, async (req: AuthRequest, res) => {
    try {
        const tags = await TagsController.getTags();
        res.status(200).json({ tags });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

export default router;
