const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth/auth.js");
const role = require("../middleware/role.js");
const path = require("path");
const fs = require("fs");

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

router.post("/module", auth, role, async (req, res) => {
  const boundary = req.headers["content-type"].split("boundary=")[1];

  if (!boundary) {
    return res.status(400).send("Invalid Content-Type header.");
  }

  let rawData = [];
  req.on("data", (chunk) => {
    rawData.push(chunk); // Stocke les chunks sous forme de tableau binaire
  });

  req.on("end", () => {
    // Reconstituer les données brutes
    rawData = Buffer.concat(rawData);

    // Extraire les parties du fichier
    const parts = rawData.split(Buffer.from(`--${boundary}`));
    const filePart = parts.find(
      (part) =>
        part.includes("Content-Disposition") && part.includes("filename")
    );

    if (!filePart) {
      return res.status(400).send("No file uploaded.");
    }

    // Trouver les indices du fichier dans la partie
    const fileDataStart = filePart.indexOf("\r\n\r\n") + 4; // Ignore les en-têtes
    const fileDataEnd = filePart.lastIndexOf("\r\n--");
    const fileData = filePart.slice(fileDataStart, fileDataEnd);

    // Extraire le nom du fichier
    const filenameMatch = filePart.toString().match(/filename="(.+?)"/);
    const filename = filenameMatch ? filenameMatch[1] : `upload-${Date.now()}`;

    const uploadPath = path.join("./src/upload/module/", filename);

    // Écrire les données dans un fichier
    fs.writeFile(uploadPath, fileData, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving file.");
      }

      res.json({
        message: "File uploaded successfully.",
        filePath: filename,
      });
    });
  });
});

module.exports = router;
