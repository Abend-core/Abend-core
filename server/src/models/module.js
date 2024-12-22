const DataTypes = require("sequelize");
const mariadb = require("../database/db");

const Module = mariadb.define(
  "Module",
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Le nom du module ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le nom du module ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le nom du module doit être compris entre 1 et 25 caractères.",
        },
      },
    },
    link: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le lien du module ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le lien du module ne doit pas être vide.",
        },
        len: {
          args: [1, 50],
          msg: "Le lien du module doit être compris entre 1 et 50 caractères.",
        },
      },
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
      validate: {
        notNull: {
          msg: "La couleur du module ne doit pas être null.",
        },
        notEmpty: {
          msg: "La couleur du module ne doit pas être vide.",
        },
        len: {
          args: [7, 7],
          msg: "La couleur du module doit avoir 7 caractères.",
        },
      },
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Module;
