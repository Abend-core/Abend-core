//Express
import express from "express";
const router = express.Router();
//Tools
import NewUUID from "../tools/uuid.js";
import fs from "fs";
import path from "path";
//Model & bdd
import Module from "../models/module";
import { Op } from "sequelize";
//Middleware
import auth from "../middleware/auth/auth.js";
import role from "../middleware/role.js";

// Création d'un nouveau module
router.post("/add", auth, async (req, res) => {
  const data = req.body;
  data.id = "";
  while (data.id === "") {
    const uuid = NewUUID();
    const user = await Module.findByPk(uuid);
    if (!user) {
      data.id = uuid;
    }
  }
  Module.create(data)
    .then((module) => {
      res.status(200).json({ message: "Module créé avec succès.", module });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Selection de tout les modules
router.get("/", (req, res) => {
  Module.findAll()
    .then((module) => {
      res.status(200).json({ message: "Tout les modules.", module });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Selection d'un module
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Module.findAll({ where: { user_id: id } })
    .then((modules) => {
      if (modules.length > 0) {
        res.status(200).json({ message: "Modules trouvés.", modules });
      } else {
        res.status(200).json({ message: "Aucun module trouvé.", modules: [] });
      }
    })
    .catch((error) => {
      console.error("Erreur serveur :", error);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération des modules.",
        erreur: error.message,
      });
    });
});

router.post("/update/:id", auth, (req, res) => {
  const id = req.params.id;
  Module.update(req.body, {
    where: { id: id },
  })
    .then((_) => {
      return Module.findByPk(id).then((module) => {
        if (module === null) {
          res.status(404).json({ message: "Module introuvable." });
        }
        res.status(200).json({ message: "Module modifié.", module });
      });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

router.post("/delete/:id", auth, (req, res) => {
  Module.findByPk(req.params.id)
    .then((data) => {
      if (data === null) {
        return res
          .status(404)
          .json({ message: "Utilisateur introuvable.", data });
      }

      const module = data.get();
      const fileDelete = path.join("./src/upload/module/", module.image);

      // Suppression du fichier avant de supprimer le module
      fs.unlink(fileDelete, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
          return res.status(500).json({
            message: "Erreur lors de la suppression du fichier.",
            error: err,
          });
        }

        Module.destroy({ where: { id: data.id } })
          .then(() => {
            res.status(200).json({ message: "Utilisateur supprimé.", data });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Erreur lors de la suppression de l'utilisateur.",
              error,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Filtre module
router.post("/filtre", auth, async (req, res) => {
  const search = req.body.search;
  Module.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { link: { [Op.like]: "%" + search + "%" } },
        { color: { [Op.like]: "%" + search + "%" } },
        { image: { [Op.like]: "%" + search + "%" } },
      ],
    },
  })
    .then((module) => {
      res.status(200).json({ message: "Module trouvé.", module });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Liste des modules par utilisateur
router.post("/user/:id", auth, async (req, res) => {
  const id = req.params.id;
  Module.findByPk(id)
    .then((module) => {
      res.status(200).json({ message: "Module trouvé.", module });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Renvoi de toute les routes
export default router;
