//Express
const express = require("express");
const router = express.Router();
//Tools
const NewUUID = require("../tools/uuid.js");
//Model & bdd
const Module = require("../models/module");
const { Op } = require("sequelize");
//Middleware
const auth = require("../middleware/auth/auth.js");
const role = require("../middleware/role.js");

// Création d'un nouveau module
router.post("/add", auth, role, async (req, res) => {
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

//Filtre module
router.post("/filtre", auth, role, async (req, res) => {
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
router.post("/user/:id", auth, role, async (req, res) => {
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
module.exports = router;
