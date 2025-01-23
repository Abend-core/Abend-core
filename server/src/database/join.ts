import User from "../models/user";
import Statut from "../models/statut";

Statut.hasMany(User, {
  foreignKey: "statut_id",
  as: "Users",
});

User.belongsTo(Statut, {
  foreignKey: "statut_id",
  as: "Statut",
});
