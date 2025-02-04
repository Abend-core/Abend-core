//Express
import express, { Request, Response } from "express";
import AuthController from "../controller/auth";

const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        await AuthController.register(req.body);
        res.status(200);
    } catch (error: any) {
        res.status(500).json({
            message: "Erreur serveur.",
            error: error.message,
        });
    }
});

router.post("/signin", async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await AuthController.signin(req.body);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
