//Express
const express = require("express");
const router = express.Router();
//Tools
const { hash } = require("../tools/hash.js");
const NewUUID = require("../tools/uuid.js");
//Modele & bdd
const User = require("../models/user.js");

// Inscription d'un utilisateur
router.post("/", async (req, res) => {
  const data = req.body;
  data.id = "";
  while (data.id === "") {
    const uuid = NewUUID();
    const user = await User.findByPk(uuid);
    if (!user) {
      data.id = uuid;
    }
  }

  User.create(data)
    .then(async (user) => {
      const userData = user.get();
      userData.password = await hash(userData.password);
      await User.update(userData, {
        where: { id: userData.id },
        validate: false,
      });
      res.status(200).json({ message: "Utilisateur inscrit avec succès." });
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

module.exports = router;
