const DataTypes = require("sequelize");
const mariadb = require("../database/db");

const User = mariadb.define(
  "User",
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le nom ne doit pas être nul.",
        },
        notEmpty: {
          msg: "Le nom ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le nom doit être de taille [1 à 25].",
        },
      },
    },
    firstname: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le prénom ne doit pas être nul.",
        },
        notEmpty: {
          msg: "Le prénom ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le prénom doit être de taille [1 à 25].",
        },
      },
    },
    mail: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: {
        msg: "Le mail est déjà utilisé.",
      },
      validate: {
        notNull: {
          msg: "L'email ne doit pas être nul.",
        },
        notEmpty: {
          msg: "L'email ne doit pas être vide.",
        },
        isEmail: {
          msg: "L'email n'est pas en format mail.",
        },
      },
    },
    birth: {
      type: DataTypes.STRING(12),
      allowNull: false,
      validate: {
        notNull: {
          msg: "La date de naissance ne doit pas être nulle.",
        },
        notEmpty: {
          msg: "La date de naissance ne doit pas être vide.",
        },
        isDate: {
          msg: "La date de naissance doit être une date.",
        },
      },
    },
    login: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: {
        msg: "L'identifiant est déjà utilisé.",
      },
      validate: {
        notNull: {
          msg: "L'identifiant ne doit pas être nul.",
        },
        notEmpty: {
          msg: "L'identifiant ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "L'identifiant doit être de taille [1 à 25].",
        },
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le mot de passe ne doit pas être nul.",
        },
        notEmpty: {
          msg: "Le mot de passe ne doit pas être vide.",
        },
        len: {
          args: [8, 60],
          msg: "Le mot de passe doit être de taille [8 à 60].",
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dateLog: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = User;
