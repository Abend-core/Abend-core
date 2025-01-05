//Rappel des table dans l'annuaire
const { User, Module } = require("../models/index.js");
const DataTypes = require("sequelize");
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
