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
router.patch(
    "/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        const userId = req.params.id;
        const userData = req.body;
        try {
            await UserController.update(userId, userData);
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
        const userId = req.params.id;
        try {
            await UserController.delete(userId);
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
router.put(
=======
router.patch(
>>>>>>> acad352 (fix: rename folders)
=======
router.put(
>>>>>>> ef8b197 (fix: upload image)
=======
router.put(
>>>>>>> 6a39d77cd996af3b3ea60c01b2ebde1307c7b858
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
router.put(
    "/password",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const userId = req.user?.id;
        const data = req.body;
        try {
            await UserController.password(userId!, data);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

export default router;
