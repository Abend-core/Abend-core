import express, { Request, Response, NextFunction } from "express";
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

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Abend !");
});

if (env == "Dev") {
    // Charger la spécification Swagger à partir du fichier YAML
    const swaggerDocument = YAML.load("./docs/swagger.yaml");
    // Utiliser Swagger UI pour rendre la documentation
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use("/uploadsFile/module", express.static("src/uploads/module"));
app.use("/uploadsFile/profil", express.static("src/uploads/profil"));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Erreur serveur :", err);

    res.status(500).json({
        message: "Erreur serveur",
        erreur: err.message || "Une erreur inconnue s'est produite",
    });
});

app.listen(port, () => {
    console.log("Serveur en ligne ! Environnement : ", env);
});
