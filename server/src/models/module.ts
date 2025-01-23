import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

interface moduleAttributes {
  id: number;
  name: string;
  link: string;
  color: string;
  image: string;
  description: string;
  views: number;
  visited: number;
  statut_id: number;
  user_id: string;
}

interface moduleCreationAttributes extends Optional<moduleAttributes, "id"> {}

class Module
  extends Model<moduleAttributes, moduleCreationAttributes>
  implements moduleAttributes
{
  public id!: number;
  public name!: string;
  public link!: string;
  public color!: string;
  public image!: string;
  public description!: string;
  public views!: number;
  public visited!: number;
  public statut_id!: number;
  public user_id!: string;
}

Module.init(
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
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    visited: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statut_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Statuts",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Module",
    tableName: "Modules",
  }
);

export default Module;
