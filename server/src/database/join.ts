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

User.hasMany(Module, {
    onDelete: "CASCADE",
    foreignKey: "user_id", // La clé étrangère de Module fait référence à l'id de User
});
Module.belongsTo(User, {
    foreignKey: "user_id", // La clé étrangère de Module fait référence à l'id de User
});

User.belongsToMany(Module, {
    through: Like,
    foreignKey: "UserId",
});

Module.belongsToMany(User, {
    through: Like,
    foreignKey: "ModuleId",
});
