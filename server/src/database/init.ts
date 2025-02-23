// tools
import Crypt from "../tools/hash";
// Db & Model
import db from "./db";
import { User } from "../models/user";
import { Module } from "../models/module";
import Tag from "../models/tag";
import Follow from "../models/follow";
import config from "config";
import Redis, { KEYS } from "../tools/redis";

const image: number = config.get("storage.nombreImageBanque");
const env = config.get("server.env");

// Data
const dataUser = require("./data/user");
const dataModule = require("./data/module");
const dataFollow = require("./data/follow");

// Fonction d'initialisation exportée
export async function initializeDatabase(force: boolean = false) {
    try {
        if (env === "Dev" || env === "Test" || env === "Prod") {
            await db.abend!.sync({ force }); // Force pour Dev/Test
            await pushDb_dev();
        } else {
            await db.abend!.sync({ alter: true }); // Alter pour Prod
        }
    } catch (err) {
        console.log("Erreur de synchronisation :", err);
        throw err; // Relance l'erreur pour les tests
    }
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
        throw err;
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

        const tagsArray = [data.tag1 ?? "", data.tag2 ?? "", data.tag3 ?? ""]
            .map((tag) => tag.toLowerCase())
            .filter((tag) => tag !== "");

        data.tags = tagsArray.join(", ");

        await Module.create(data);

        for (const tag of tagsArray) {
            const [tagInstance, created] = await Tag.findOrCreate({
                where: { name: tag },
                defaults: { name: tag, uses: 1 },
            });

            if (!created) {
                await tagInstance.increment("uses", { by: 1 });
            }
        }
    }
    console.log("   - ✅ Modules");
}

async function initFollow() {
    for (const data of dataFollow.follows) {
        await Follow.create(data);
    }
    console.log("   - ✅ Follow");
}
