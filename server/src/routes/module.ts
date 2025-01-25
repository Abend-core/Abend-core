//Express
import express, { Request, Response } from "express";
const router = express.Router();
//Tools
import NewUUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import { uploadModule } from '../tools/multer';
//Model & bdd
import Module from "../models/module";
import Liked from "../models/liked";
import { Op, Sequelize } from "sequelize";
//Middleware
import auth from "../middleware/auth/auth";
import role from "../middleware/role";

// Création d'un nouveau module
router.post("/add", auth, async (req, res) => {
  uploadModule.single('image')(req, res, (err) => {

    const data =  req.body;
    console.log(data)
    return
  //   const link: string = req.body.link;
  //   const response: string = await checkLink(link);
  // data.id = "";
  // while (data.id === "") {
  //   const uuid = NewUUID();
  //   const user = await Module.findByPk(uuid);
  //   if (!user) {
  //     data.id = uuid;
  //   }
  // }
  //   if (response != "ok") {
  //     res
  //       .status(402)
  //       .json({ message: "Le lien ne correspond pas au format attendu." });
  //     return;
  //   }
  //   if (err) {
  //     return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image.' });
  //   }
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'L\'image est requise.' });
  //   }
  //   data.image = req.file.filename;
  });



  // Module.create(data)
  //   .then((module) => {
  //     res.status(200).json({ message: "Module créé avec succès.", module });
  //   })
  //   .catch((error) => {
  //     if (error.name === "SequelizeValidationError") {
  //       const errors = error.errors.map((err: { message: any }) => err.message);
  //       return res.status(401).json({ errors });
  //     }
  //     res.status(500).json({ message: "Erreur serveur.", erreur: error });
  //   });
});

// Selection de tout les modules visible
router.get("/show", (req, res) => {
  Module.findAll({
    where: {
      isShow: true,
    },
  })
    .then((module) => {
      res.status(200).json({ message: "Tout les modules.", module });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Selection de tout les modules invisible
router.get("/hide", (req, res) => {
  Module.findAll({
    where: {
      isShow: false,
    },
  })
    .then((module) => {
      res.status(200).json({ message: "Tout les modules.", module });
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err: { message: any }) => err.message);
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
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Selection d'un module
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Module.findAll({ where: { user_id: id } })
    .then((modules) => {
      if (modules.length > 0) {
        res.status(200).json({ message: "Modules trouvés.", modules });
      } else {
        res.status(200).json({ message: "Aucun module trouvé.", modules: [] });
      }
    })
    .catch((error) => {
      console.error("Erreur serveur :", error);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération des modules.",
        erreur: error.message,
      });
    });
});

router.post("/update/:id", auth, (req, res) => {
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
        const errors = error.errors.map((err: { message: any }) => err.message);
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

router.post("/delete/:id", auth, (req, res) => {
  Module.findByPk(req.params.id)
    .then((data) => {
      if (data === null) {
        return res
          .status(404)
          .json({ message: "Module introuvable.", data });
      }

      const module = data.get();
      const fileDelete = path.join("./src/uploads/module/", module.image);

      // Suppression du fichier avant de supprimer le module
      fs.unlink(fileDelete, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
          return res.status(500).json({
            message: "Erreur lors de la suppression du fichier.",
            error: err,
          });
        }

        Module.destroy({ where: { id: data.id } })
          .then(() => {
            res.status(200).json({ message: "Module supprimé.", data });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Erreur lors de la suppression du module.",
              error,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

//Filtre module
router.post("/filtre", auth, async (req, res) => {
  const search = req.body.search;
  Module.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { link: { [Op.like]: "%" + search + "%" } },
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
router.get("/user/:id", auth, async (req, res) => {
  const id = req.params.id;
  Module.findByPk(id)
    .then((module) => {
      res.status(200).json({ message: "Modules trouvés.", module });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur.", erreur: error });
    });
});

// Liste des modules par utilisateur
router.post("/liked", async (req, res) => {
  const { UserId, ModuleId } = req.body;

  try {
    const like = await Liked.create(req.body);

    await Module.increment("likes", { where: { id: ModuleId } });

    res
      .status(200)
      .json({ message: "Module liké et compteur mis à jour.", like });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

// Sélection de tous les modules avec la colonne `is_liked`
router.post("/modules/liked", async (req, res) => {
  try {
    const { userId } = req.body; // Récupérer l'ID utilisateur depuis le corps de la requête

    const modules = await Module.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`
              CASE
                WHEN EXISTS (
                  SELECT 1
                  FROM Likes
                  WHERE Likes.ModuleId = Module.id
                  AND Likes.UserId = '${userId}'
                ) THEN 1
                ELSE 0
              END
            `),
            "is_liked",
          ],
        ],
      },
    });

    res.status(200).json({ message: "Tous les modules.", modules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", erreur: error });
  }
});

async function checkLink(link: string): Promise<string> {
  let message: string = "ok";
  if (link.includes("https://") == false) {
    message = "Le lien n'est pas au bon format.";
    return message;
  }
  const parts = link.split("//");
  if (parts[0] != "https:") {
    message = "Le lien n'est pas au bon format.";
    return message;
  }

  const domainExtension = parts[1];
  const split = domainExtension.split(".");
  for (let i = 0; i < split.length - 1; i++) {
    message = await blackList(split[i]);
  }
  if (message != "ok") {
    return message;
  }
  message = await goodList(split[split.length - 1]);

  return message;
}

async function goodList(text: string): Promise<string> {
  const listeExtension: Array<string> = [
    "fr",
    "com",
    "org",
    "app",
    "net",
    "pt",
    "es",
    "pro",
    "de",
    "ru",
    "ir",
    "in",
    "uk",
    "au",
    "ua",
    "tv",
    "de",
    "online",
    "info",
    "eu",
    "tk",
    "cn",
    "xyz",
    "site",
    "top",
    "icu",
  ];

  const containsExtension = listeExtension.some((extension) =>
    text.includes(extension)
  );
  if (!containsExtension) {
    return "Le lien n'est pas au bon format.";
  }

  return "ok";
}

async function blackList(text: string): Promise<string> {
  const listeDomaine: Array<string> = [
    "porn",
    "porno",
    "sexe",
    "adult",
    "xxx",
    "sex",
    "onlyfans",
    "escort",
    "camgirl",
    "casino",
    "gambling",
    "bet",
    "poker",
    "ads",
  ];
  // Construire une expression régulière pour détecter des mots interdits
  const regex = new RegExp(`\\b(${listeDomaine.join("|")})\\b`, "i");

  // Vérifier si le texte correspond à la liste des mots interdits
  if (regex.test(text)) {
    return "Le lien n'est pas au bon format.";
  }

  return "ok";
}

//Renvoi de toute les routes
export default router;
