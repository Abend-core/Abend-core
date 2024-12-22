//Rappel des table dans l'annuaire
const { User, Module, Log } = require("../models/index.js");

//Différentes jointure

User.belongsToMany(Module, {
  through: "UserModule",
  foreignKey: "userId",
  otherKey: "moduleId",
});

Module.belongsToMany(User, {
  through: "UserModule",
  foreignKey: "moduleId",
  otherKey: "userId",
});
