//Express
import express, { Request, Response } from "express";
const router = express.Router();
//Tools
import Image from "../tools/multer";
import Redis from "../tools/redis";
//Middleware
import auth from "../middlewares/auth/auth";
import ModuleController from "../controllers/module";
interface AuthRequest extends Request {
  user?: { id: string }; // Ajout d'un champ user dans req
}

// Création d'un nouveau module
router.post(
  "/",
  auth,
  Image.getUploadModule().single("image"),
  Image.resizeImage,
  async (req, res) => {
    const file = req.file;
    const data = req.body;
    try {
      await ModuleController.add(data, file!);
      res.status(200).json();
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
  }
);

router.get("/showAdmin", async (req, res) => {
  try {
    const modules = await ModuleController.showAdmin();
    res.status(200).json({ modules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

router.get("/show", auth, async (req: AuthRequest, res) => {
  const userId = req.user?.id;
  try {
    const modules = await ModuleController.show(userId!);
    res.status(200).json({ modules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

// Selection de tout les modules invisible
router.get("/hide", auth, async (req: AuthRequest, res) => {
  const userId = req.user?.id;
  try {
    const modules = await ModuleController.hide(userId!);
    res.status(200).json({ modules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

// Selection de tout les modules
router.get("/", async (req, res) => {
  try {
    const modules = await ModuleController.getAll();
    res.status(200).json({ module: modules });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

// Selection des modules de l'utilisateur connecté
router.get("/user", auth, async (req: AuthRequest, res) => {
  const idUser = req.user?.id;
  try {
    const modules = await ModuleController.getModule(idUser!);
    res.status(200).json({ modules });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur.",
      erreur: error,
    });
  }
});

// Modification d'un module
router.patch("/:id", auth, async (req, res) => {
  const moduleId = req.params.id;
  const data = req.body;
  try {
    const updatedModule = await ModuleController.update(moduleId, data);
    res
      .status(200)
      .json({
        message: "Module mis à jour avec succès",
        module: updatedModule,
      });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

//Suppression d'un module
router.delete("/:id", auth, async (req, res) => {
  const moduleId = req.params.id;
  try {
    await ModuleController.delete(moduleId);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

//Filtre module
router.post("/filtre", async (req, res) => {
  const search: string = req.body.search;
  try {
    const module = await ModuleController.filtre(search);
    res.status(200).json({ module });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

//Recuperation de toute les informations d'un utilisateur (info user/info modules/favoris)
router.get("/user/:username", auth, async (req, res) => {
  const userName = req.params.username;
  try {
    const userData = await ModuleController.getUserData(userName);
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

// Ajoute en favoris le module
router.post("/liked/:id", auth, async (req: AuthRequest, res: Response) => {
  const UserId = req.user?.id;
  const ModuleId = req.params.id;
  try {
    await ModuleController.toggleLike(UserId!, ModuleId);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

// Ajoute en visite le module
router.post("/visited", auth, async (req: AuthRequest, res) => {
  const UserId = req.user?.id;
  const ModuleId = req.params.id;
  try {
    await ModuleController.toggleView(UserId!, ModuleId);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

// Sélection de tous les modules mis en favoris par l'utilisateur
router.get("/liked", auth, async (req: AuthRequest, res) => {
  const userId = req.user?.id;
  try {
    const modules = await ModuleController.moduleLikeByUser(userId!);
    res.status(200).json({ modules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

export default router;
