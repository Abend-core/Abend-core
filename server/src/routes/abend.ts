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
 *                     actions: 300
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

export default router;
