const express = require("express");
const router = express.Router();
const NewUUID = require("../tools/uuid.js");
const Module = require("../models/module");
const User = require("../models/user.js");
const auth = require("../middleware/auth/auth.js");
const role = require("../middleware/role.js");

// Création d'un nouveau module
router.post("/add", auth, role, async (req, res) => {
  const users = await User.findAll();
  const data = req.body;
  data.id = NewUUID();
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
  Module.findByPk(id)
    .then((module) => {
      if (module) {
        res.status(200).json({ message: "Module trouvé.", module });
      } else {
        res.status(404).json({ message: "Module introuvable." });
      }
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

router.post("/update/:id", auth, role, (req, res) => {
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

router.post("/delete/:id", auth, role, (req, res) => {
  Module.findByPk(req.params.id)
    .then((module) => {
      if (module === null) {
        res.status(404).json({ message: "Utilisateur introuvable.", module });
      }

      return Module.destroy({ where: { id: module.id } }).then((_) => {
        res.status(200).json({ message: "Utilisateur supprimé.", module });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Renvoie de toute les routes
module.exports = router;
