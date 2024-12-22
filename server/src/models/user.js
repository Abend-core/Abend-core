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
          msg: "Le nom de l'utilisateur ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le nom de l'utilisateur ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le nom de l'utilisateur doit être compris entre 1 et 25 caractères.",
        },
      },
    },
    firstname: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le prénom de l'utilisateur ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le prénom de l'utilisateur ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le prénom de l'utilisateur doit être compris entre 1 et 25 caractères.",
        },
      },
    },
    mail: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le mail de l'utilisateur ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le mail de l'utilisateur ne doit pas être vide.",
        },
        isEmail: {
          msg: "Le mail de l'utilisateur n'est pas en format mail.",
        },
      },
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La date de naissance de l'utilisateur ne doit pas être null.",
        },
        notEmpty: {
          msg: "La date de naissance de l'utilisateur ne doit pas être vide.",
        },
        isDate: {
          msg: "La date de naissance de l'utilisateur doit être une date.",
        },
      },
    },
    login: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: {
        msg: "Le login de l'utilisateur doit être unique !",
      },
      validate: {
        notNull: {
          msg: "Le login de l'utilisateur ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le login de l'utilisateur ne doit pas être vide.",
        },
        len: {
          args: [1, 25],
          msg: "Le login de l'utilisateur doit être compris entre 1 et 25 caractères.",
        },
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le mot de passe de l'utilisateur ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le mot de passe de l'utilisateur ne doit pas être vide.",
        },
        len: {
          args: [1, 60],
          msg: "Le mot de passe de l'utilisateur doit être compris entre 1 et 25 caractères.",
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isLog: {
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
