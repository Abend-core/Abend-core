const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth/auth.js");
const role = require("../middleware/role.js");
const path = require("path");

// Création d'un nouvel utilisateur
// router.post("/profil", auth, role, async (req, res) => {
//   const data = req.body;
//   const modules = await Module.findAll();
//   data.id = NewUUID();
//   bcrypt.hash(data.password, 10).then((hash) => {
//     data.password = hash;
//     User.create(data)
//       .then((user) => {
//         res
//           .status(200)
//           .json({ message: "Utilisateur créé avec succès.", user });
//       })
//       .catch((error) => {
//         if (error.name === "SequelizeValidationError") {
//           const errors = error.errors.map((err) => err.message);
//           return res.status(400).json({ errors });
//         }
//         res.status(500).json({ message: "Erreur serveur.", erreur: error });
//       });
//   });
// });

// Traitement des images pour les modules
router.post("/module", auth, role, async (req, res) => {
  const boundary = req.headers["content-type"].split("boundary=")[1];

  if (!boundary) {
    return res.status(400).send("Invalid Content-Type header.");
  }

  let rawData = "";
  req.on("data", (chunk) => {
    rawData += chunk;
  });

  req.on("end", () => {
    // Extraire le fichier à partir des données brutes
    const parts = rawData.split("--${boundary}");
    const filePart = parts.find(
      (part) =>
        part.includes("Content-Disposition") && part.includes("filename")
    );

    if (!filePart) {
      return res.status(400).send("No file uploaded.");
    }

    const fileDataStart = filePart.indexOf("\r\n\r\n") + 4; // Skip headers
    const fileDataEnd = filePart.lastIndexOf("\r\n--");
    const fileData = filePart.slice(fileDataStart, fileDataEnd);

    // Récupérer le nom de fichier à partir des en-têtes
    const filenameMatch = filePart.match(/filename="(.+?)"/);
    const filename = filenameMatch ? filenameMatch[1] : `upload-${Date.now()}`;

    const uploadPath = path.join("../uploads/module/", filename);

    // Écrire les données dans un fichier
    fs.writeFile(uploadPath, fileData, "binary", (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving file.");
      }

      res.json({
        message: "File uploaded successfully.",
        filePath: uploadPath,
      });
    });
  });
});

//Renvoie de toute les routes
module.exports = router;
