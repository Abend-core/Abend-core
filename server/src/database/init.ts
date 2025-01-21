import sequelize from "./db";
const dataModule = require("./data/module");
import { hash } from "../tools/hash";
import NewUUID from "../tools/uuid";
const dataUser = require("./data/user");
import User from "../models/user";
import Module from "../models/module";

let lastUUID: string;

sequelize
  .sync({ force: true })
  .then(async (_) => {
    try {
      for (const data of dataUser.users) {
        data.id = "";
        data.image = "bank-img-" + Math.trunc(Math.random() * 13) + ".png";
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
  })
  .catch((err) => {
    console.log("Erreur de synchronisation :", err);
  });
