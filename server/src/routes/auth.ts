// routes/auth.ts (ou ton fichier de routes)
import express, { Request, Response } from "express";
import AuthController from "../controllers/auth";
import AuthValidator from "../validators/auth";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscrit un nouvel utilisateur
 *     description: Crée un compte utilisateur avec les données fournies
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "motdepasse123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inscription réussie
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
 *                   example: "Email déjà utilisé"
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
 *                   example: "Détails de l'erreur"
 */
router.post("/register", async (req: Request, res: Response): Promise<void> => {
    const error = await AuthValidator.register(req.body);
    if (error) {
        res.status(400).json({ Erreur: error });
        return;
    }
    try {
        await AuthController.register(req.body);
        res.status(200).json();
    } catch (error: any) {
        res.status(500).json({
            message: "Erreur serveur.",
            error: error.message,
        });
    }
});

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Connecte un utilisateur
 *     description: Authentifie un utilisateur et retourne une réponse (token probable)
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "motdepasse123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt.token"
 *       400:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Erreur:
 *                   type: string
 *                   example: "Mot de passe incorrect"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la connexion"
 */
router.post("/signin", async (req: Request, res: Response): Promise<void> => {
    const error = await AuthValidator.signin(req.body);
    if (error) {
        res.status(400).json({ Erreur: error });
        return;
    }
    try {
        const response = await AuthController.signin(req.body);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /auth/validation:
 *   post:
 *     summary: Valide un token
 *     description: Vérifie la validité d'un token fourni
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "jwt.token"
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Token validé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Token invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Erreur:
 *                   type: string
 *                   example: "Token expiré"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur de validation"
 */
router.post(
    "/validation",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const error = await AuthValidator.validation(req.body.token);
            if (error) {
                res.status(400).json({ Erreur: error });
                return;
            }
            await AuthController.validation(req.body.token);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
);

/**
 * @swagger
 * /auth/forgotpassword:
 *   post:
 *     summary: Demande de réinitialisation de mot de passe
 *     description: Envoie un email de réinitialisation à l'adresse fournie
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 example: "user@example.com"
 *             required:
 *               - mail
 *     responses:
 *       200:
 *         description: Demande envoyée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Email invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Erreur:
 *                   type: string
 *                   example: "Email non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de l'envoi"
 */
router.post(
    "/forgotpassword",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const error = await AuthValidator.forgot(req.body.mail);
            if (error) {
                res.status(400).json({ Erreur: error });
                return;
            }
            await AuthController.forgot(req.body.mail);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
);

/**
 * @swagger
 * /auth/updatepassword:
 *   post:
 *     summary: Met à jour le mot de passe
 *     description: Change le mot de passe d'un utilisateur avec un token
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "jwt.token"
 *               newPassword:
 *                 type: string
 *                 example: "nouveauMotDePasse123"
 *             required:
 *               - token
 *               - newPassword
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
 *                   example: "Token invalide"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la mise à jour"
 */
router.post(
    "/updatepassword",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const error = await AuthValidator.updatepassword(req.body);
            if (error) {
                res.status(400).json({ Erreur: error });
                return;
            }
            await AuthController.updatepassword(req.body);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
);

/**
 * @swagger
 * /auth/veriftoken:
 *   get:
 *     summary: Vérifie la validité d'un token
 *     description: Retourne si le token est valide ou non
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "jwt.token"
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Résultat de la vérification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la vérification"
 */
router.get(
    "/veriftoken",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const value = await AuthValidator.validation(req.body.token);
            res.status(200).json({ token: !value });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
);

export default router;
