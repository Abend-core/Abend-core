//Express
import express, { Request, Response } from "express";
import AbendController from "../controllers/abend";

const router = express.Router();

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
