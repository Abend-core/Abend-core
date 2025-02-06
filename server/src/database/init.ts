//tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
//Db & Model
import db from "./db";
import { User } from "../models/user";
import { Module } from "../models/module";
import config from "config";

const image: number = config.get("storage.nombreImageBanque");
const env = config.get("server.env");

//Data
const dataUser = require("./data/user");
const dataModule = require("./data/module");

let lastUUID: string;
if (env == "Dev") {
    db.abend
        .sync({ force: true })
        .then(async (_) => {
            pushDb_dev();
        })
        .catch((err) => {
            console.log("Erreur de synchronisation :", err);
        });
} else {
    db.abend
        .sync({ alter: true })
        .then(async (_) => {})
        .catch((err) => {
            console.log("Erreur de synchronisation :", err);
        });
}

async function pushDb_dev() {
    try {
        console.log("");
        console.log("Début de synchronisation...");
        console.log("");
        await initUsers(), await initModules();
        console.log("");
        console.log("Synchronisation terminée !");
    } catch (err) {
        console.error("Erreur :", err);
    }
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
    console.log("   - ✅ Utilisateurs");
}
async function initModules() {
    for (const data of dataModule.modules) {
        data.isShow = true;
        data.id = UUID.v7();

        data.user_id = lastUUID;
        await Module.create(data);
    }
    console.log("   - ✅ Modules");
}
