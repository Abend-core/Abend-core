const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const bcrypt = require("bcrypt");
const NewUUID = require("../tools/uuid.js");
const auth = require("../middleware/auth/auth.js");
const role = require("../middleware/role.js");
const User = require("../models/user");
const Module = require("../models/module");

// Création d'un nouvel utilisateur
router.post("/add", auth, role, async (req, res) => {
  const data = req.body;
  const modules = await Module.findAll();
  data.id = NewUUID();
  bcrypt.hash(data.password, 10).then((hash) => {
    data.password = hash;
    User.create(data)
      .then((user) => {
        res
          .status(200)
          .json({ message: "Utilisateur créé avec succès.", user });
      })
      .catch((error) => {
        if (error.name === "SequelizeValidationError") {
          const errors = error.errors.map((err) => err.message);
          return res.status(400).json({ errors });
        }
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
      });
  });
});

// Selection de tout les utilisateurs
router.get("/", auth, role, (req, res) => {
  User.findAll({
    order: [["createdAt", "desc"]],
  })
    .then((user) => {
      res.status(200).json({ message: "Tout les utilisateurs.", user });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Selection d'un utilisateur
router.get("/:id", auth, (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "Utilisateur trouvé.", user });
      } else {
        res.status(404).json({ message: "Utilisateur introuvable." });
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

// Modification d'un utilisateur
router.post("/update/:id", auth, role, (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((_) => {
      return User.findByPk(id).then((user) => {
        if (user === null) {
          res.status(404).json({ message: "Utilisateur introuvable." });
        }
        res.status(200).json({ message: "Utilisateur modifié.", user });
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

// Modification du champs dernière
router.post("/update/:id", auth, role, (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((_) => {
      return User.findByPk(id).then((user) => {
        if (user === null) {
          res.status(404).json({ message: "Utilisateur introuvable." });
        }
        res.status(200).json({ message: "Utilisateur modifié.", user });
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

//Suppression d'un utilisateur
router.post("/delete/:id", auth, role, async (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).json({ message: "Utilisateur introuvable.", user });
      }

      return User.destroy({ where: { id: user.id } }).then((_) => {
        res.status(200).json({ message: "Utilisateur supprimé.", user });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Filtre utilisateur
router.post("/filtre", auth, role, async (req, res) => {
  const search = req.body.search;
  User.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { firstname: { [Op.like]: "%" + search + "%" } },
        { mail: { [Op.like]: "%" + search + "%" } },
        { login: { [Op.like]: "%" + search + "%" } },
      ],
    },
  })
    .then((user) => {
      res.status(200).json({ message: "Utilisateur trouvé.", user });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Renvoie de toute les routes
module.exports = router;
