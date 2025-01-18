import DataTypes from "sequelize";
import mysql from "../database/db";

const Module = mysql.define(
  "Module",
  {
    id: {
      type: DataTypes.UUID,
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
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le lien du module ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le lien du module ne doit pas être vide.",
        },
        len: {
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La couleur du module ne doit pas être null.",
        },
        notEmpty: {
          msg: "La couleur du module ne doit pas être vide.",
        },
        len: {
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "L'image du module ne doit pas être null.",
        },
        notEmpty: {
          msg: "L'image du module ne doit pas être vide.",
        },
        len: {
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {},
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

export default Module;
