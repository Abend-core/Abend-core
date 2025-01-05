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
      // Création des utilisateurs un par un
      for (const user of dataUser) {
        // Hashage du mot de passe
        user.password = await bcrypt.hash(user.password, 10);

        // Création de chaque utilisateur
        await User.create(user);
      }

      // Insérer le module si l'utilisateur existe ou si le UserId est optionnel
      await Module.bulkCreate(dataModule);

      console.log("Utilisateurs et modules insérés avec succès.");
    } catch (err) {
      console.error("Erreur lors de l'insertion :", err);
    }
  })
  .catch((err) => {
    console.log("Erreur de synchronisation :", err);
  });
