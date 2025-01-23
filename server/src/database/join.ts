import User from "../models/user";
import Statut from "../models/statut";
import Like from "../models/liked";
import Module from "../models/module";

Statut.hasMany(User, {
  foreignKey: "statut_id",
  as: "Users",
});

User.belongsTo(Statut, {
  foreignKey: "statut_id",
  as: "Statut",
});

User.belongsToMany(Module, {
  through: Like,
  foreignKey: "UserId",
});

Module.belongsToMany(User, {
  through: Like,
  foreignKey: "ModuleId",
});
