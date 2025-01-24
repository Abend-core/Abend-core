//tools
import { hash } from "../tools/hash";
import NewUUID from "../tools/uuid";
//Db & Model
import sequelize from "./db";
import User from "../models/user";
import Module from "../models/module";
import Statut from "../models/statut";
import config from "config";

const env = config.get("server.env");

//Data
const dataUser = require("./data/user");
const dataModule = require("./data/module");
const dataStatut = require("./data/statut");

let lastUUID: string;
if(env == 'Dev'){
  sequelize
    .sync({ force: true })
    .then(async (_) => {
    
      pushDb_dev()
    
    })
    .catch((err) => {
      console.log("Erreur de synchronisation :", err);
    });
}else{
  sequelize
    .sync()
    .then(async (_) => {
    
      pushDb_prod()
    
    })
    .catch((err) => {
      console.log("Erreur de synchronisation :", err);
    });
}

async function pushDb_dev(){
  try {
    for (const data of dataStatut.statuts) {
      await Statut.create(data);
      }
      console.log("");
      console.log("Statut insérés avec succès.");
      for (const data of dataUser.users) {
        data.id = "";
        if (data.image == undefined) {
          data.image = "bank-img-" + Math.trunc(Math.random() * 29) + ".png";
        }

        while (data.id === "") {
          const uuid = NewUUID();
          const user = await User.findByPk(uuid);
          if (!user) {
            data.id = uuid;
            lastUUID = uuid;
          }
        }
        await User.create(data);
        data.password = await hash(data.password);
        await User.update(data, {
          where: { id: lastUUID },
          validate: false,
        });
      }
      console.log("");
      console.log("Utilisateurs insérés avec succès.");
      console.log("");
      for (const data of dataModule.modules) {
        data.id = "";

        while (data.id === "") {
          const uuid = NewUUID();
          const test = await Module.findByPk(uuid);
          if (!test) {
            data.id = uuid;
          }
        }
      data.user_id = lastUUID;
      await Module.create(data);
    }
    console.log("Modules insérés avec succès.");
    console.log("");
    console.log("Synchronisation effectuée !");
  } catch (err) {
    console.error("Erreur :", err);
  }
}

async function pushDb_prod(){
  try {
    for (const data of dataStatut.statuts) {
      await Statut.create(data);
      }
      console.log("");
      console.log("Statut insérés avec succès.");
      for (const data of dataUser.users) {
        data.id = "";
        if (data.image == undefined) {
          data.image = "bank-img-" + Math.trunc(Math.random() * 29) + ".png";
        }

        while (data.id === "") {
          const uuid = NewUUID();
          const user = await User.findByPk(uuid);
          if (!user) {
            data.id = uuid;
            lastUUID = uuid;
          }
        }
        await User.create(data);
        data.password = await hash(data.password);
        await User.update(data, {
          where: { id: lastUUID },
          validate: false,
        });
      }
      console.log("");
      console.log("Utilisateurs insérés avec succès.");
      console.log("");
      for (const data of dataModule.modules) {
        data.id = "";

        while (data.id === "") {
          const uuid = NewUUID();
          const test = await Module.findByPk(uuid);
          if (!test) {
            data.id = uuid;
          }
        }
      data.user_id = lastUUID;
      await Module.create(data);
    }
    console.log("Modules insérés avec succès.");
    console.log("");
    console.log("Synchronisation effectuée !");
  } catch (err) {
    console.error("Erreur :", err);
  }
}
