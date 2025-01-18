//Rappel des table dans l'annuaire
import { User, Module } from "../models/index.js";

//Différentes jointure
User.hasMany(Module, {
  foreignKey: "user_id",
  as: "modules",
});

Module.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
