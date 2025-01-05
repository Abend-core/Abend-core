const mariadb = require("./db");
const dataModule = require("./data/module");
const bcrypt = require("bcrypt");
const dataUser = require("./data/user");
const User = require("../models/user");
const Module = require("../models/module");

// const views = require("../views/index");

mariadb
  .sync({ force: true })
  .then(async (_) => {
    try {
      const modules = await Module.findAll();

      for (const user of dataUser) {
        user.password = await bcrypt.hash(user.password, 10);

        const createdUser = await User.create(user);

        for (const module of modules) {
          await createdUser.addModule(module.id);
        }
      }
      await Module.bulkCreate(dataModule);
      console.log("Utilisateurs insérés avec succès.");
      console.log("Synchronisation effectuée !");
    } catch (err) {
      console.error("Erreur :", err);
    }
  })
  .catch((err) => {
    console.log("Erreur de synchronisation :", err);
  });
