//Express
const express = require("express");
const router = express.Router();
//Tools
const { compare } = require("../tools/hash.js");
const jwt = require("jsonwebtoken");
const privateKey = require("../middleware/auth/key.js");

const User = require("../models/user.js");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { login: req.body.login } });

    if (!user) {
      return res.status(404).json({
        message: "Identifiant ou mot de passe incorrect.",
      });
    }

    const isPasswordValid = compare(req.body.password, user.password);
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
