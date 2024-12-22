const jwt = require("jsonwebtoken");
const privateKey = require("../middleware/auth/key.js");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.body.id } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "L'utilisateur demandé n'existe pas" });
    }

    //On créer un nouveau token pour cette utilisateur sans le communiquer pour écraser l'ancien.
    const token = jwt.sign({ userId: user.login }, privateKey, {
      expiresIn: "1h",
    });
    User.update(
      { isLog: false, dateLog: "" },
      {
        where: { id: user.id },
      }
    );

    return res.json({
      message: "L'utilisateur a été déconnecté avec succès.",
      data: { user },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Une erreur est survenue. L'utilisateur n'a pas pu être déconnecté. Réessayez dans quelques instants.",
    });
  }
});

module.exports = router;
