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
        const [found, error] = await Promise.all([
            UserValidator.found(req.user?.id!),
            UserValidator.hasFile(req.file!),
        ]);
        if (!found) {
            res.status(404).json();
            return;
        }
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
        const [found, error] = await Promise.all([
            UserValidator.found(req.user?.id!),
            UserValidator.password(req.body, req.user?.id!),
        ]);

        if (!found) {
            res.status(404).json();
            return;
        }

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

// Update etat actif utilisateur
router.put(
    "/active/:id",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const found = await UserValidator.found(req.params.id);
        if (!found) {
            res.status(404).json();
            return;
        }

        try {
            await UserController.toggleActive(req.params.id);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

// Suivre un autre utilisateur
router.post(
    "/follow/:id",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const [foundUser, foundMe] = await Promise.all([
            UserValidator.found(req.params.id),
            UserValidator.found(req.user?.id!),
        ]);
        if (!foundUser || !foundMe) {
            res.status(404).json();
            return;
        }
        try {
            await UserController.follower(req.user?.id!, req.params.id);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

// Avoir les personnes qui suivent et qui l'utilisateur connecter suis 
router.get(
    "/follow",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
       
        const foundUser =  UserValidator.found(req.user?.id!)
        
        if (!foundUser) {
            res.status(404).json();
            return;
        }
        try {
            const network = await UserController.getFollow(req.user?.id!);
            res.status(200).json({ network: network});
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

export default router;
