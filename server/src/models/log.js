const DataTypes = require("sequelize");
const mariadb = require("../database/db");

const Log = mariadb.define(
  "Log",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    query: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Le query de log ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le query de log ne doit pas être vide.",
        },
        len: {
          args: [6, 6],
          msg: "Le query de log doit avoir 6 caractères.",
        },
      },
    },
    table: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: {
          msg: "La table de log ne doit pas être null.",
        },
        notEmpty: {
          msg: "La table de log ne doit pas être vide.",
        },
        len: {
          args: [1, 50],
          msg: "La table de log doit être compris entre 1 et 20 caractères.",
        },
      },
    },
    name: {
      type: DataTypes.STRING(7),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le champ nom de log ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le champ nom de log ne doit pas être vide.",
        },
        len: {
          args: [1, 20],
          msg: "Le champ nom de log doit avoir entre 1 et 20 caractères.",
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La date de log ne doit pas être null.",
        },
        notEmpty: {
          msg: "La date de log ne doit pas être vide.",
        },
        isDate: {
          msg: "La date de log doit être une date.",
        },
      },
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Log;
