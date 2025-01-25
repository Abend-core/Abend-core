//Express
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
//Model & bdd
import User from "../models/user";
import Statut from "../models/statut";
import { Op } from "sequelize";
//Tools
import { hash, compare } from "../tools/hash";
import NewUUID from "../tools/uuid";
//Middleware
import auth from "../middleware/auth/auth";
import role from "../middleware/role";

// Création d'un nouvel utilisateur
router.post("/add", auth, role, async (req: Request, res: Response) => {
  const data = req.body;
  data.id = "";
  if (data.image == undefined) {
    data.image = "bank-img-" + Math.trunc(Math.random() * 29) + ".png";
  }
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
      res.status(200).json({ message: "Utilisateur créé avec succès.", user });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Selection de tout les utilisateurs
router.get("/", auth, role, (req: Request, res: Response) => {
  User.findAll({
    order: [["createdAt", "desc"]],
  })
    .then((user) => {
      res.status(200).json({ message: "Tout les utilisateurs.", user });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Selection d'un utilisateur
router.get("/:id", auth, (req: Request, res: Response) => {
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
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Modification d'un utilisateur
router.post("/update/:id", auth, (req: Request, res: Response) => {
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
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Suppression d'un utilisateur
router.post(
  "/delete/:id",
  auth,
  role,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findByPk(req.params.id);

      if (user === null) {
        res.status(404).json({ message: "Utilisateur introuvable." });
        return;
      }

      await User.destroy({ where: { id: user.id } });

      res.status(200).json({ message: "Utilisateur supprimé.", user });
      return;
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
      return;
    }
  }
);

//Filtre utilisateur
router.post("/filtre", auth, async (req: Request, res: Response) => {
  const search = req.body.search;
  User.findAll({
    where: {
      [Op.or]: [
        { username: { [Op.like]: "%" + search + "%" } },
        { mail: { [Op.like]: "%" + search + "%" } },
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

//Update password
router.post(
  "/password",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findByPk(req.body.id);

      if (user === null) {
        res.status(404).json({ message: "Utilisateur introuvable." });
        return;
      }

      const isPasswordValid = await compare(req.body.password, user.password);

      if (!isPasswordValid) {
        res.status(402).json({
          message: "Mot de passe incorrect.",
        });
        return;
      }
      if(req.body.newPassword.length < 8){
        res.status(405).json({
          message: "Le mot de passe doit avoir au moins 8 caractères.",
        });
        return;
      }

      if(req.body.newPassword != req.body.confirmPassword){
        res.status(403).json({
          message: "Les mots de passe ne correspondent pas.",
        });
        return;
      }

      let password:string = await hash(req.body.newPassword);
      User.update(
        { password: password },
        {
          where: { id: user.id },
        }
      )
        .then((user) => {
          res.status(200).json({ message: "Mot de passe modifié.", user });
        })
        .catch((error) => {
          res.status(500).json({ message: "Erreur serveur.", erreur: error });
        });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
      return;
    }
  }
);

//test
router.post("/test", async (req: Request, res: Response) => {
  const id = req.body.id;
  User.findOne({
    where: { id: id },
  })
    .then((user) => {
      res.status(200).json({ message: "Utilisateur trouvé.", user });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Renvoie de toute les routes
export default router;
