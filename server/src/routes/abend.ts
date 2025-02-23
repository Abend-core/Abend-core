//Express
import express, { Request, Response } from "express";
import AbendController from "../controllers/abend";

const router = express.Router();

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Récupère les statistiques de l'application
 *     description: Retourne des données statistiques calculées par AbendController
 *     tags: [Abend]
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   description: Données statistiques (structure dépendante de AbendController)
 *                   example:
 *                     utilisateurs: 150
 *                     visites: 300
 *                     modules: 450
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
 *                   example: "Détails de l'erreur ici"
 */
router.get("/stats", async (req: Request, res: Response): Promise<void> => {
    try {
        const statistique = await AbendController.statistique();
        res.status(200).json({ stats: statistique });
    } catch (error: any) {
        res.status(500).json({
            message: "Erreur serveur.",
            error: error.message,
        });
    }
});

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Récupère les trois modules les plus visités
 *     description: Retourne toutes les informations des trois modules les plus visités
 *     tags: [Abend]
 *     responses:
 *       200:
 *         description: Module récupéré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: object
 *                   description: Modules
 *                   example:
 *                     UUID:
 *                     name: Abend.io
 *                     content: Description
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
 *                   example: "Détails de l'erreur ici"
 */
router.get("/visite", async (req: Request, res: Response): Promise<void> => {
    try {
        const modules = await AbendController.visite();
        res.status(200).json({ modules: modules });
    } catch (error: any) {
        res.status(500).json({
            message: "Erreur serveur.",
            error: error.message,
        });
    }
});

export default router;
