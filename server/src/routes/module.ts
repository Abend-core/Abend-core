import express, { Request, Response } from "express";
const router = express.Router();
// Tools
import Image from "../tools/multer";
import fs from "fs";
import path from "path";
// Middleware
import auth from "../middlewares/auth/auth";
// Controller
import ModuleController from "../controllers/module";
import TagsController from "../controllers/tags";
// Validator
import ModuleValidator from "../validators/module";

interface AuthRequest extends Request {
    user?: { id: string };
}

/**
 * @swagger
 * /modules/:
 *   post:
 *     summary: Crée un nouveau module
 *     description: Ajoute un module avec une image et des données, nécessite authentification
 *     tags: [Modules]
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
 *                 description: Fichier image du module
 *               name:
 *                 type: string
 *                 example: "Nouveau module"
 *               content:
 *                 type: string
 *                 example: "Description du module"
 *               link:
 *                 type: string
 *                 example: "https://abnd.io"
 *               tag1:
 *                 type: string
 *                 example: "Dev"
 *               tag2:
 *                 type: string
 *                 example: "JS"
 *               tag3:
 *                 type: string
 *                 example: "css"
 *             required:
 *               - name
 *               - content
 *               - image
 *               - link
 *     responses:
 *       200:
 *         description: Module créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Données invalides ou fichier manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erreur:
 *                   type: string
 *                   example: "Titre requis"
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
    "/",
    auth,
    Image.getUploadModule().single("image"),
    Image.resizeImage,
    async (req, res) => {
        const [found, error] = await Promise.all([
            ModuleValidator.hasFile(req.file!),
            ModuleValidator.data(req.body),
        ]);
        const fileDelete = path.join("./src/uploads/module/", req.file!.filename);
        if (found) {
            res.status(400).json({ erreur: found });
            
            fs.promises.unlink(fileDelete);
            return;
        }
        if (error) {
            res.status(400).json({ erreur: error });
            fs.promises.unlink(fileDelete);
            return;
        }
        try {
            await ModuleController.add(req.body, req.file!);
            await TagsController.add(req.body);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur.", erreur: error });
        }
    }
);

/**
 * @swagger
 * /modules/showAdmin:
 *   get:
 *     summary: Affiche les modules pour l'admin
 *     description: Retourne tous les modules visibles pour un administrateur
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: Liste des modules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
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
router.get("/showAdmin", async (req, res) => {
    try {
        const modules = await ModuleController.showAdmin();
        res.status(200).json({ modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/show:
 *   get:
 *     summary: Affiche les modules visibles pour l'utilisateur
 *     description: Retourne les modules visibles pour l'utilisateur connecté
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des modules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
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
router.get("/show", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.show(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/hide:
 *   get:
 *     summary: Affiche les modules cachés
 *     description: Retourne les modules invisibles pour l'utilisateur connecté
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des modules cachés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
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
router.get("/hide", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.hide(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/:
 *   get:
 *     summary: Récupère tous les modules
 *     description: Retourne la liste complète des modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des modules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 module:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
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
router.get("/", auth, async (req, res) => {
    try {
        const modules = await ModuleController.getAll();
        res.status(200).json({ module: modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/user:
 *   get:
 *     summary: Récupère les modules de l'utilisateur connecté
 *     description: Retourne les modules associés à l'utilisateur connecté
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des modules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
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
router.get("/user", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.getModule(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur.",
            erreur: error,
        });
    }
});

/**
 * @swagger
 * /modules/{id}:
 *   patch:
 *     summary: Modifie un module
 *     description: Met à jour les données d'un module existant
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du module à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nouveau titre"
 *               description:
 *                 type: string
 *                 example: "Nouvelle description"
 *     responses:
 *       200:
 *         description: Module mis à jour
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
 *                 erreur:
 *                   type: string
 *                   example: "Description trop longue"
 *       404:
 *         description: Module non trouvé
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
router.patch("/:id", auth, async (req, res) => {
    const [found, error] = await Promise.all([
        ModuleValidator.foundModule(req.params.id),
        ModuleValidator.data(req.body),
    ]);
    if (!found) {
        res.status(404).json();
        return;
    }
    if (error) {
        res.status(400).json({ erreur: error });
        return;
    }
    try {
        await ModuleController.update(req.params.id, req.body);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/{id}:
 *   delete:
 *     summary: Supprime un module
 *     description: Supprime un module et ses tags associés
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du module à supprimer
 *     responses:
 *       200:
 *         description: Module supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Module non trouvé
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
router.delete("/:id", auth, async (req, res) => {
    const found = await ModuleValidator.foundModule(req.params.id);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        await TagsController.delete(req.params.id);
        await ModuleController.delete(req.params.id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/filtre:
 *   post:
 *     summary: Filtre les modules
 *     description: Recherche des modules selon un terme de recherche
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 example: "module"
 *             required:
 *               - search
 *     responses:
 *       200:
 *         description: Modules filtrés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 module:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
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
router.post("/filtre", auth, async (req, res) => {
    const search: string = req.body.search;
    try {
        const module = await ModuleController.filtre(search);
        res.status(200).json({ module });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/user/{username}:
 *   get:
 *     summary: Récupère les données d’un utilisateur
 *     description: Retourne les informations de l’utilisateur (modules, favoris, etc.)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom d'utilisateur
 *     responses:
 *       200:
 *         description: Données de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userData:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     modules:
 *                       type: array
 *                       items:
 *                         type: object
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
router.get("/user/:username", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUserByUsername(
        req.params.username
    );
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const userData = await ModuleController.getUserData(
            req.user?.id!,
            req.params.username
        );
        res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/liked/{id}:
 *   post:
 *     summary: Ajoute ou retire un module des favoris
 *     description: Bascule l'état "liké" d’un module pour l'utilisateur connecté
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du module
 *     responses:
 *       200:
 *         description: Action effectuée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Module ou utilisateur non trouvé
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
router.post("/liked/:id", auth, async (req: AuthRequest, res: Response) => {
    const [foundUser, foundModule] = await Promise.all([
        ModuleValidator.foundUser(req.user?.id!),
        ModuleValidator.foundModule(req.params.id),
    ]);
    if (!foundModule || !foundUser) {
        res.status(404).json();
        return;
    }
    try {
        await ModuleController.toggleLike(req.user?.id!, req.params.id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/visited/{id}:
 *   post:
 *     summary: Marque un module comme visité
 *     description: Bascule l'état "visité" d’un module pour l'utilisateur connecté
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du module
 *     responses:
 *       200:
 *         description: Action effectuée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Module ou utilisateur non trouvé
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
router.post("/visited/:id", auth, async (req: AuthRequest, res) => {
    const [foundUser, foundModule] = await Promise.all([
        ModuleValidator.foundUser(req.user?.id!),
        ModuleValidator.foundModule(req.params.id),
    ]);
    if (!foundModule || !foundUser) {
        res.status(404).json();
        return;
    }
    try {
        await ModuleController.toggleView(req.user?.id!, req.params.id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/liked:
 *   get:
 *     summary: Récupère les modules favoris
 *     description: Retourne les modules marqués comme favoris par l'utilisateur connecté
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des modules favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
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
router.get("/liked", auth, async (req: AuthRequest, res) => {
    const found = await ModuleValidator.foundUser(req.user?.id!);
    if (!found) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.moduleLikeByUser(req.user?.id!);
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/reported/{id}:
 *   post:
 *     summary: Signale un module
 *     description: Bascule l'état "signalé" d’un module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du module
 *     responses:
 *       200:
 *         description: Module signalé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: object
 *       404:
 *         description: Module ou utilisateur non trouvé
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
router.post("/reported/:id", auth, async (req: AuthRequest, res) => {
    const [foundUser, foundModule] = await Promise.all([
        ModuleValidator.foundUser(req.user?.id!),
        ModuleValidator.foundModule(req.params.id),
    ]);
    if (!foundModule || !foundUser) {
        res.status(404).json();
        return;
    }
    try {
        const modules = await ModuleController.toggleReport(
            req.user?.id!,
            req.params.id
        );
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/reported:
 *   get:
 *     summary: Récupère les modules signalés
 *     description: Retourne la liste des modules signalés
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des modules signalés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
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
router.get("/reported", auth, async (req: AuthRequest, res) => {
    try {
        const modules = await ModuleController.getReported();
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

/**
 * @swagger
 * /modules/tags:
 *   get:
 *     summary: Récupère les tags
 *     description: Retourne la liste des tags disponibles
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
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
router.get("/tags", auth, async (req: AuthRequest, res) => {
    try {
        const tags = await TagsController.getTags();
        res.status(200).json({ tags });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
    }
});

export default router;
