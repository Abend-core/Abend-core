//Rappel des table dans l'annuaire
const { User, Module } = require("../models/index.js");
const DataTypes = require("sequelize");
//Différentes jointure
User.hasMany(Module, {
  foreignKey: "user_id", // Le nom de la clé étrangère dans le modèle Module
  as: "modules", // Nom de la relation pour les jointures
});

Module.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
