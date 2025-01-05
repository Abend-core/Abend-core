//Rappel des table dans l'annuaire
const { User, Module } = require("../models/index.js");
const DataTypes = require("sequelize");
//Différentes jointure

Module.belongsTo(User, {
  foreignKey: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
});
