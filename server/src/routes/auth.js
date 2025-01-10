//Express
const express = require("express");
const router = express.Router();
//Tools
const { hash } = require("../tools/hash.js");
const NewUUID = require("../tools/uuid.js");
const { compare } = require("../tools/hash.js");
const jwt = require("jsonwebtoken");
const privateKey = require("../middleware/auth/key.js");
//Modele & bdd
const User = require("../models/user.js");

router.post("/register", async (req, res) => {
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

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ where: { login: req.body.login } });

    if (!user) {
      return res.status(404).json({
        message: "Identifiant ou mot de passe incorrect.",
      });
    }

    const isPasswordValid = await compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Identifiant ou mot de passe incorrect.",
      });
    }

    const token = jwt.sign({ userId: user.login }, privateKey, {
      expiresIn: "1h",
    });
    User.update(
      { dateLog: new Date() },
      {
        where: { id: user.id },
      }
    );

    return res.json({
      message: "L'utilisateur a été connecté avec succès.",
      UUID: user.id,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Serveur en maintenance. Réessayez dans quelques instants.",
    });
  }
});

module.exports = router;
