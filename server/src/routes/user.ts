// routes/user.ts (ou ton fichier de routes)
import express, { Request, Response } from "express";
const router = express.Router();
// Controller
import UserController from "../controllers/user";
// Tools
import Image from "../tools/multer";
// Middleware
import auth from "../middlewares/auth/auth";
import role from "../middlewares/role";
// Validator
import UserValidator from "../validators/user";

interface AuthRequest extends Request {
    user?: { id: string };
}

/**
 * @swagger
 * users/:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     description: Ajoute un utilisateur avec les données fournies, nécessite authentification et rôle spécifique
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               mail:
 *                 type: string
 *                 example: "john@example.com"
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - username
 *               - mail
 *               - isAdmin
 *     responses:
 *       200:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Erreur:
 *                   type: string
 *                   example: "Cet identifiant est déjà utilisé."
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
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

/**
 * @swagger
 * users/:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     description: Retourne la liste complète des utilisateurs, nécessite authentification et rôle
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       mail:
 *                         type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
router.get("/", auth, role, async (req: Request, res: Response) => {
    try {
        const user = await UserController.getAll();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * users/image:
 *   put:
 *     summary: Met à jour la photo de profil
 *     description: Télécharge et met à jour la photo de profil de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image de profil
 *             required:
 *               - image
 *     responses:
 *       200:
 *         description: Photo mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Fichier manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Erreur:
 *                   type: string
 *                   example: "Aucun fichier téléchargé."
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 */
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
        if (error) {
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

/**
 * @swagger
 * users/password:
 *   put:
 *     summary: Met à jour le mot de passe
 *     description: Change le mot de passe de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "ancienMotDePasse"
 *               newPassword:
 *                 type: string
 *                 example: "nouveauMotDePasse123"
 *               confirmPassword:
 *                 type: string
 *                 example: "nouveauMotDePasse123"
 *             required:
 *               - password
 *               - newPassword
 *               - confirmPassword
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Erreur:
 *                   type: string
 *                   example: "Les mots de passe ne sont pas identiques."
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
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

/**
 * @swagger
 * users/network:
 *   get:
 *     summary: Récupère le réseau de l'utilisateur connecté
 *     description: Retourne les personnes suivies et qui suivent l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Réseau de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 network:
 *                   type: object
 *                   properties:
 *                     following:
 *                       type: array
 *                       items:
 *                         type: string
 *                     followers:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 res:
 *                   type: string
 *                   example: "erreur"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
router.get(
    "/network",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const foundUser = await UserValidator.found(req.user?.id!);
        if (!foundUser) {
            res.status(404).json({ res: "erreur" });
            return;
        }
        try {
            const network = await UserController.getNetwork(req.user?.id!);
            res.status(200).json({ network: network });
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

/**
 * @swagger
 * users/network/{name}:
 *   get:
 *     summary: Récupère le réseau d'un utilisateur spécifique
 *     description: Retourne les personnes suivies et qui suivent un utilisateur ciblé par son nom
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom d'utilisateur cible
 *     responses:
 *       200:
 *         description: Réseau de l'utilisateur ciblé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 network:
 *                   type: object
 *                   properties:
 *                     following:
 *                       type: number
 *                       example: 10
 *                     followers:
 *                       type: number
 *                       example: 15
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 res:
 *                   type: string
 *                   example: "erreur"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
router.get(
    "/network/:name",
    auth,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const foundUser = await UserValidator.foundByName(req.params.name!);
        if (!foundUser) {
            res.status(404).json({ res: "erreur" });
            return;
        }
        try {
            const network = await UserController.getNetworkCount(
                req.params.name!
            );
            res.status(200).json({ network: network });
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

/**
 * @swagger
 * users/active/{id}:
 *   put:
 *     summary: Bascule l'état actif d'un utilisateur
 *     description: Active ou désactive un utilisateur spécifié
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: État mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
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

/**
 * @swagger
 * users/follow/{id}:
 *   post:
 *     summary: Suit un utilisateur
 *     description: Ajoute un utilisateur à la liste des suivis de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à suivre
 *     responses:
 *       200:
 *         description: Suivi effectué
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
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

/**
 * @swagger
 * users/{id}:
 *   get:
 *     summary: Récupère un utilisateur
 *     description: Retourne les détails d’un utilisateur spécifique
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     mail:
 *                       type: string
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
router.get("/:id", auth, async (req: Request, res: Response) => {
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

/**
 * @swagger
 * users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     description: Supprime un utilisateur spécifié
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * users/{id}:
 *   patch:
 *     summary: Modifie un utilisateur
 *     description: Met à jour les données d’un utilisateur spécifié
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newusername"
 *               mail:
 *                 type: string
 *                 example: "newmail@example.com"
 *               content:
 *                 type: string
 *                 example: "Nouvelle description"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Erreur:
 *                   type: string
 *                   example: "Cet identifiant est déjà utilisé."
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 *                 erreur:
 *                   type: string
 */
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

export default router;
