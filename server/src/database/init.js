const mariadb = require("./db");
const dataModule = require("./data/module");
const { hash } = require("../tools/hash.js");
const NewUUID = require("../tools/uuid.js");
const { encrypt, decrypt } = require("../tools/crypt.js");
const dataUser = require("./data/user");
const User = require("../models/user");
const Module = require("../models/module");

let lastUUID;

mariadb
  .sync({ force: true })
  .then(async (_) => {
    try {
      for (const user of dataUser) {
        user.id = "";
        
        while (user.id === "") {
          const uuid = NewUUID();
          const test = await User.findByPk(uuid);
          if (!test) {
            user.id = uuid;
            lastUUID = uuid;
          }
        }
        user.name = await encrypt(user.name, user.login)
        user.password = await hash(user.password);
        await User.create(user);
      }
      console.log('')
      console.log("Utilisateurs insérés avec succès.");
      console.log('')
      for (const module of dataModule) {
        module.id = "";
        
        while (module.id === "") {
          const uuid = NewUUID();
          const test = await Module.findByPk(uuid);
          if (!test) {
            module.id = uuid;
          }
        }
        module.user_id = lastUUID;
        await Module.create(module);
      }
      console.log('')
      console.log("Modules insérés avec succès.");
      console.log('')
      console.log("Synchronisation effectuée !");
    } catch (err) {
      console.error("Erreur :", err);
    }
    // require("../views/index");
  })
  .catch((err) => {
    console.log("Erreur de synchronisation :", err);
  });
