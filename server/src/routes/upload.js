//Express
const express = require("express");
const router = express.Router();
//Middleware
const auth = require("../middleware/auth/auth.js");
const role = require("../middleware/role.js");
//Tools
const path = require("path");
const fs = require("fs");
const NewUUID = require("../tools/uuid.js");
//Bdd && Model
const Module = require("../models/module.js");
const User = require("../models/user.js");

router.post("/module", auth, role, async (req, res) => {
  const boundary = req.headers["content-type"].split("boundary=")[1];

  if (!boundary) {
    return res.status(400).send("Invalid Content-Type header.");
  }

  let rawData = [];

  req.on("data", (chunk) => {
    rawData.push(chunk); // On empile les chunks dans un tableau
  });

  req.on("end", async () => {
    // Reconstituer les données brutes sous forme de Buffer
    rawData = Buffer.concat(rawData);

    const filePart = extractFilePart(rawData, boundary);
    if (!filePart) {
      return res.status(400).send("No file uploaded.");
    }

    const fileData = extract(filePart);

    let filename = "";

    while (filename === "") {
      const uuid = NewUUID();
      const module = await Module.findByPk(uuid);
      if (!module) {
        filename = uuid;
      }
    }

    const uploadPath = path.join("./src/upload/module/", filename);

    saveFile(uploadPath, fileData, filename, res);
  });
});

router.post("/profil", auth, role, async (req, res) => {
  const boundary = req.headers["content-type"].split("boundary=")[1];

  if (!boundary) {
    return res.status(400).send("Invalid Content-Type header.");
  }

  let rawData = [];
  req.on("data", (chunk) => {
    rawData.push(chunk); // On empile les chunks dans un tableau
  });

  req.on("end", async () => {
    // Reconstituer les données brutes sous forme de Buffer
    rawData = Buffer.concat(rawData);

    const filePart = extractFilePart(rawData, boundary);
    if (!filePart) {
      return res.status(400).send("No file uploaded.");
    }

    const fileData = extract(filePart);

    let filename = "";

    while (filename === "") {
      const uuid = NewUUID();
      const user = await User.findByPk(uuid);
      if (!user) {
        filename = uuid;
      }
    }

    const uploadPath = path.join("./src/upload/profil/", filename);

    saveFile(uploadPath, fileData, filename, res);
  });
});

function extractFilePart(rawData, boundary) {
  const boundaryBuffer = Buffer.from(`--${boundary}`, "utf8");
  let startIndex = 0;
  let filePart = null;

  while ((startIndex = rawData.indexOf(boundaryBuffer, startIndex)) !== -1) {
    const nextBoundaryIndex = rawData.indexOf(
      boundaryBuffer,
      startIndex + boundaryBuffer.length
    );
    if (nextBoundaryIndex === -1) break; // On s'arrête si on ne trouve pas un autre boundary

    const part = rawData.slice(
      startIndex + boundaryBuffer.length,
      nextBoundaryIndex
    );

    if (part.includes("Content-Disposition") && part.includes("filename")) {
      filePart = part;
    }

    startIndex = nextBoundaryIndex;
  }

  return filePart;
}

function extract(filePart) {
  // Extraire les données du fichier
  const fileDataStart = filePart.indexOf("\r\n\r\n") + 4; // Ignorer les en-têtes
  const fileDataEnd = filePart.lastIndexOf("\r\n--");
  const fileData = filePart.slice(fileDataStart, fileDataEnd);

  return fileData;
}

function saveFile(uploadPath, fileData, filename, res) {
  fs.writeFile(uploadPath, fileData, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).send("Error saving file.");
    }

    res.json({
      message: "File uploaded successfully.",
      filePath: filename,
    });
  });
}

module.exports = router;
