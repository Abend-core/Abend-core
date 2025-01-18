import DataTypes from "sequelize";
import mysql from "../database/db";

const User = mysql.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le nom ne doit pas être nul.",
        },
        notEmpty: {
          msg: "Le nom ne doit pas être vide.",
        },
        len: {
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le prénom ne doit pas être nul.",
        },
        notEmpty: {
          msg: "Le prénom ne doit pas être vide.",
        },
        len: {
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
    mail: {
      type: DataTypes.STRING,
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
        len: {
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
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
      type: DataTypes.STRING,
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
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le mot de passe ne doit pas être nul.",
        },
        notEmpty: {
          msg: "Le mot de passe ne doit pas être vide.",
        },
        len: {
          args: [8, 255],
          msg: "Le mot de passe doit contenir [8 à 255] caractères.",
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export default User;
