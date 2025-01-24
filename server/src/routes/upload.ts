//Express
import express, { Request, Response } from "express";
const router = express.Router();
//Middleware
import auth from "../middleware/auth/auth";
import role from "../middleware/role";
//Tools
import path from "path";
import fs from "fs";
import NewUUID from "../tools/uuid";
//Bdd && Model
import Module from "../models/module";
import User from "../models/user";

type RawData = Buffer[];

router.post(
  "/module",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const contentType = req.headers["content-type"];

    if (!contentType || !contentType.includes("boundary=")) {
      res.status(400).send("Invalid Content-Type header.");
      return;
    }

    const boundary = contentType.split("boundary=")[1];

    let rawData: RawData = [];

    req.on("data", (chunk) => {
      rawData.push(chunk); // On empile les chunks dans un tableau
    });

    req.on("end", async () => {
      // Reconstituer les données brutes sous forme de Buffer
      const bufferData = Buffer.concat(rawData);

      const filePart = extractFilePart(bufferData, boundary);
      if (!filePart) {
        return res.status(400).send("No file uploaded.");
      }

      const fileData = extract(filePart);

      let filename = "";

      while (filename === "") {
        const uuid = NewUUID();
        const module = await Module.findByPk(uuid);
        if (!module) {
          filename = uuid + ".png";
        }
      }

      const uploadPath = path.join("./src/upload/module/", filename);

      saveFile(uploadPath, fileData, filename, res);
    });
  }
);

router.post(
  "/profil",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const contentType = req.headers["content-type"];

    // Vérification si "content-type" existe
    if (!contentType || !contentType.includes("boundary=")) {
      res.status(400).send("Invalid Content-Type header.");
      return;
    }

    const boundary = contentType.split("boundary=")[1];

    let rawData: RawData = [];
    req.on("data", (chunk) => {
      rawData.push(chunk); // On empile les chunks dans un tableau
    });

    req.on("end", async () => {
      // Reconstituer les données brutes sous forme de Buffer
      const bufferData = Buffer.concat(rawData);

      const filePart = extractFilePart(bufferData, boundary);
      if (!filePart) {
        return res.status(400).send("No file uploaded.");
      }

      const fileData = extract(filePart);

      let filename = "";

      while (filename === "") {
        const uuid = NewUUID();
        const user = await User.findByPk(uuid);
        if (!user) {
          filename = uuid + ".png";
        }
      }

      const uploadPath = path.join("./src/upload/profil/", filename);

      saveFile(uploadPath, fileData, filename, res);
    });
  }
);

function extractFilePart(rawData: Buffer, boundary: string): Buffer | null {
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

function extract(filePart: Buffer): Buffer {
  // Extraire les données du fichier
  const fileDataStart = filePart.indexOf("\r\n\r\n") + 4; // Ignorer les en-têtes
  const fileDataEnd = filePart.lastIndexOf("\r\n--");
  const fileData = filePart.slice(fileDataStart, fileDataEnd);

  return fileData;
}

function saveFile(
  uploadPath: string,
  fileData: Buffer,
  filename: string,
  res: Response
): void {
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

export default router;
