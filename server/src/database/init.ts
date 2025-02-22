//tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
//Db & Model
import db from "./db";
import { User } from "../models/user";
import { Module } from "../models/module";
import Follow from "../models/follow";
import config from "config";
import Redis, { KEYS } from "../tools/redis";

const image: number = config.get("storage.nombreImageBanque");
const env = config.get("server.env");

//Data
const dataUser = require("./data/user");
const dataModule = require("./data/module");
const dataFollow = require("./data/follow");

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
        Redis.deleteCache(KEYS.modules);
        console.log("");
        console.log("Début de synchronisation...");
        console.log("");
        await initUsers();
        await initModules();
        await initFollow();
        console.log("");
        console.log("Synchronisation terminée !");
    } catch (err) {
        console.error("Erreur :", err);
    }
}

async function initUsers() {
    for (const data of dataUser.users) {
        if (data.image == undefined) {
            data.image =
                "bank-img-" + Math.trunc(Math.random() * image) + ".png";
        }
        await User.create(data);
        data.password = await Crypt.hash(data.password);
        await User.update(data, {
            where: { id: data.id },
            validate: false,
        });
    }
    console.log("   - ✅ Utilisateurs");
}
async function initModules() {
    for (const data of dataModule.modules) {
        data.isShow = true;
        data.tags = [data.tag1 ?? "", data.tag2 ?? "", data.tag3 ?? ""]
            .filter((tag) => tag !== "")
            .join(", ");
        await Module.create(data);
    }
    console.log("   - ✅ Modules");
}

async function initFollow() {
    for (const data of dataFollow.follows) {
        await Follow.create(data);
    }
    console.log("   - ✅ Follow");
}
