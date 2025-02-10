//Express
import express, { Request, Response } from "express";
import AuthController from "../controllers/auth";
import AuthValidator from "../validators/auth";

const router = express.Router();

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

router.post(
  "/validation",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;
      if (!token) {
        res.status(400).json({ message: "Token manquant" });
        return;
      }

      await AuthController.validation(token);
      res.status(200).json({ message: "Compte activé avec succès !" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Une erreur inconnue s'est produite." });
      }
    }
  }
);

export default router;
