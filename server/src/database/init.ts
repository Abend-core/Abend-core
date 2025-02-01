//tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
//Db & Model
import sequelize from "./db";
import User from "../models/user";
import Module from "../models/module";
import Statut from "../models/statut";
import config from "config";
import Etat from "../models/etat";

const image: number = config.get("storage.nombreImageBanque");
const env = config.get("server.env");

//Data
const dataUser = require("./data/user");
const dataModule = require("./data/module");
const dataStatut = require("./data/statut");
const dataEtats = require("./data/etat");

let lastUUID: string;
if (env == "Dev") {
    sequelize
        .sync({ force: true })
        .then(async (_) => {
            pushDb_dev();
        })
        .catch((err) => {
            console.log("Erreur de synchronisation :", err);
        });
} else {
    sequelize
        .sync({ alter: true })
        .then(async (_) => {})
        .catch((err) => {
            console.log("Erreur de synchronisation :", err);
        });
}

async function pushDb_dev() {
    try {
        console.log("Début de synchronisation...");
        await initStatus();
        console.log("");
        await initEtats();
        console.log("");
        await initUsers();
        console.log("");
        await initModules();
        console.log("");
        console.log("Synchronisation terminée !");
    } catch (err) {
        console.error("Erreur :", err);
    }
}

async function initStatus() {
    for (const data of dataStatut.statuts) {
        await Statut.create(data);
    }
    console.log("Status insérés avec succès.");
}
async function initEtats() {
    for (const data of dataEtats.etats) {
        await Etat.create(data);
    }
    console.log("Etats insérés avec succès.");
}
async function initUsers() {
    for (const data of dataUser.users) {
        data.id = "";
        if (data.image == undefined) {
            data.image =
                "bank-img-" + Math.trunc(Math.random() * image) + ".png";
        }

        data.id = UUID.v7();
        lastUUID = data.id;
        await User.create(data);
        data.password = await Crypt.hash(data.password);
        await User.update(data, {
            where: { id: lastUUID },
            validate: false,
        });
    }
    console.log("Utilisateurs insérés avec succès.");
}
async function initModules() {
    for (const data of dataModule.modules) {
        data.id = "";

        data.id = UUID.v7();

        data.user_id = lastUUID;
        await Module.create(data);
    }
    console.log("Modules insérés avec succès.");
}
