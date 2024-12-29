const bcrypt = require("bcrypt");
const NewUUID = require("../tools/uuid.js");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Module = require("../models/module");

// Inscription d'un utilisateur
router.post("/", async (req, res) => {
  const data = req.body;
  const modules = await Module.findAll();
  data.id = NewUUID();
  bcrypt.hash(data.password, 10).then((hash) => {
    if (data.password.length >= 8) {
      data.password = hash;
    }

    User.create(data)
      .then((user) => {
        res
          .status(200)
          .json({ message: "Utilisateur inscrit avec succès.", user });
        for (i = 0; i < modules.length; i++) {
          user.addModule(modules[i].id);
        }
      })
      .catch((error) => {
        if (
          error.name === "SequelizeValidationError" ||
          error.name === "SequelizeUniqueConstraintError"
        ) {
          const errors = error.errors.map((err) => err.message);
          return res.status(400).json({ errors });
        }
        res.status(500).json({ message: "Erreur serveur.", erreur: error });
      });
  });
});

module.exports = router;
