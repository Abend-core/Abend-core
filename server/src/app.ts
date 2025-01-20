import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import config from "config";
const port: number = config.get("server.port");
const env: string = config.get("server.env");

import cors from "cors";
let corsOptions;

//Appel des models et les jointures
require("./database/join");
//Initialisation de la bdd
require("./database/init");

if (port == 5000) {
  corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5000",
      "http://127.0.0.1:5500",
    ],
    methods: ["GET", "HEAD", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "role"],
    maxAge: 3000,
  };
} else {
  corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5000",
      "http://127.0.0.1:5500",
    ],
    methods: ["GET", "HEAD", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "role"],
    maxAge: 3000,
  };
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

import auth from "./routes/auth";
app.use("/auth", auth);

import users from "./routes/user";
app.use("/users", users);

import modules from "./routes/module";
app.use("/modules", modules);

import upload from "./routes/upload";

app.use("/upload", upload);

app.get("/", (res: Response) => {
  res.send("Hello Abend !");
});

// Charger la spécification Swagger à partir du fichier YAML
const swaggerDocument = YAML.load("./docs/swagger.yaml");

// Utiliser Swagger UI pour rendre la documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/uploadsFile/module", express.static("src/upload/module"));
app.use("/uploadsFile/profil", express.static("src/upload/profil"));

app.listen(port, () => {
  console.log("Serveur en ligne ! Environnement : ", env);
});
