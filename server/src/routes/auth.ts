//Express
import express, { Request, Response } from "express";

//Tools
import { hash } from "../tools/hash";
import NewUUID from "../tools/uuid";
import { compare } from "../tools/hash";
import jwt from "jsonwebtoken";
import privateKey from "../middleware/auth/key";
//Modele & bdd
import User from "../models/user";

interface SignInBody {
  login: string;
  password: string;
}

const router = express.Router();

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
      res.status(201).json({ message: "Utilisateur inscrit avec succès." });
    })
    .catch((error) => {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(401).json({ errors });
      }
      res.status(501).json({ message: "Erreur serveur.", erreur: error });
    });
});

router.post("/signin", async (req, res): Promise<void> => {
  try {
    const user = await User.findOne({ where: { login: req.body.login } });

    if (!user) {
      res.status(401).json({
        message: "Identifiant ou mot de passe incorrect.",
      });
      return;
    }

    const isPasswordValid = await compare(req.body.password, user.password);

    if (!isPasswordValid) {
      res.status(402).json({
        message: "Identifiant ou mot de passe incorrect.",
      });
      return;
    }

    const token = jwt.sign({ userId: user.login }, privateKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "L'utilisateur a été connecté avec succès.",
      UUID: user.id,
      token,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(501).json({
      message: "Serveur en maintenance. Réessayez dans quelques instants.",
    });
    return;
  }
});

export default router;
