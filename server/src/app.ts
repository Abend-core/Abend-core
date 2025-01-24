import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import config from "config";

const port: number = config.get("server.port");
const origin: Array<string> = config.get("cors.origin");
const method: Array<string> = config.get("cors.method");
const allowedHeaders: Array<string> = config.get("cors.allowedHeaders");
const maxAge: number = config.get("cors.maxAge");
const env: string = config.get("server.env");

//Appel des models et les jointures
require("./database/join");
//Initialisation de la bdd
require("./database/init");
let corsOptions = {
    origin: origin,
    methods: method,
    allowedHeaders: allowedHeaders,
    maxAge: maxAge,
};

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

app.get("/", (req:Request, res: Response) => {
  res.send("Hello Abend !");
});

if(env == 'dev'){
  // Charger la spécification Swagger à partir du fichier YAML
  const swaggerDocument = YAML.load("./docs/swagger.yaml");
  // Utiliser Swagger UI pour rendre la documentation
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use("/uploadsFile/module", express.static("src/upload/module"));
app.use("/uploadsFile/profil", express.static("src/upload/profil"));

app.listen(port, () => {
  console.log("Serveur en ligne ! Environnement : ", env);
});
