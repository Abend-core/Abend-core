import mysql from "./db";
import dataModule from "./data/module";
import { hash } from "../tools/hash.js";
import NewUUID from "../tools/uuid.js";
import dataUser from "./data/user";
import User from "../models/user";
import Module from "../models/module";

let lastUUID;

mysql
  .sync({ force: true })
  .then(async (_) => {
    try {
      for (const data of dataUser) {
        data.id = "";
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
      for (const data of dataModule) {
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
  })
  .catch((err) => {
    console.log("Erreur de synchronisation :", err);
  });
