//Express
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
//Controller
import UserController from "../controllers/user";
//Tools
import Image from "../tools/multer";

//Middleware
import auth from "../middlewares/auth/auth";
import role from "../middlewares/role";
//Controller
import UserValidator from "../validators/user";

interface AuthRequest extends Request {
    user?: { id: string }; // Ajout d'un champ user dans req
}

// Création d'un nouvel utilisateur
router.post("/", auth, role, async (req: Request, res: Response) => {
    const error = await UserValidator.data(req.body);
    if (error) {
        res.status(400).json({ Erreur: error });
        return;
    }
    try {
        await UserController.add(req.body);
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
    const found = await UserValidator.found(req.params.id);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const user = await UserController.getOne(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

// Modification d'un utilisateur
router.patch(
    "/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        const found = await UserValidator.found(req.params.id);
        if (!found) {
            res.status(404).json();
            return;
        }
        const error = await UserValidator.data(req.body);
        if (error) {
            res.status(400).json({ Erreur: error });
            return;
        }
        try {
            await UserController.update(req.params.id, req.body);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

//Suppression d'un utilisateur
router.delete(
    "/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        const found = await UserValidator.found(req.params.id);
        if (!found) {
            res.status(404).json();
            return;
        }
        try {
            await UserController.delete(req.params.id);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", error: error });
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

router.put(
    "/image",
    auth,
    Image.getUploadProfil().single("image"),
    Image.resizeImage,
    async (req: AuthRequest, res: Response) => {
        const found = await UserValidator.found(req.user?.id!);
        if (!found) {
            res.status(404).json();
            return;
        }
        const error = await UserValidator.hasFile(req.file!);
        if (!error) {
            res.status(400).json({ Erreur: error });
            return;
        }
        try {
            await UserController.image(req.body, req.file!);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur." });
        }
    }
);

// Update password utilisateur
router.put(
    "/password",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const found = await UserValidator.found(req.user?.id!);
        if (!found) {
            res.status(404).json();
            return;
        }
        const error = await UserValidator.password(req.body, req.user?.id!);
        if (error) {
            res.status(400).json({ Erreur: error });
            return;
        }
        try {
            await UserController.password(req.user?.id!, req.body);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

export default router;
