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
          msg: "Le nom ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le nom ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le nom est trop long [1 à 25]",
        },
      },
    },
    firstname: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le prénom ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le prénom ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le prénom est trop long [1 à 25]",
        },
      },
    },
    mail: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le mail ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le mail ne doit pas être vide.",
        },
        isEmail: {
          msg: "Le mail n'est pas en format mail.",
        },
      },
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La date de naissance ne doit pas être null.",
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
        msg: "Le login doit être unique !",
      },
      validate: {
        notNull: {
          msg: "Le login ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le login ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le login est trop long [1 à 25]",
        },
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le mot de passe ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le mot de passe ne doit pas être vide.",
        },
        len: {
          args: [1, 60],
          msg: "Le mot de passe est trop long [1 à 60]",
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
