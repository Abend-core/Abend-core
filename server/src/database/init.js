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
      for (const user of dataUser) {
        user.password = await bcrypt.hash(user.password, 10);
        await User.create(user);
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
