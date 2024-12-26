const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../middleware/auth/key.js");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { login: req.body.login } });

    if (!user) {
      return res.status(404).json({
        message: "L'utilisateur demandé n'existe pas",
        code: "401",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Le mot de passe est incorrect.",
        code: "401",
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
      code: "200",
      UUID: user.id,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Une erreur est survenue. L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.",
      code: "500",
    });
  }
});

module.exports = router;
