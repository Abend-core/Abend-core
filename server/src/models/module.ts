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
  likes: number;
  isShow: boolean;
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
  public likes!: number;
  public isShow!: boolean;
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
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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

// SELECT
//     m.id AS module_id,
//     m.name AS module_name,
//     m.description,
//     m.likes AS total_likes,
//     CASE
//         WHEN l.UserId IS NOT NULL THEN 1
//         ELSE 0
//     END AS is_liked
// FROM Modules m
// LEFT JOIN Likes l ON m.id = l.ModuleId AND l.UserId = '019494fe-56f4-75f7-8907-e76dc77dba76'
// WHERE l.UserId = '019494fe-56f4-75f7-8907-e76dc77dba76';

// SELECT
//     m.*,
//     CASE
//         WHEN l.UserId IS NOT NULL THEN 1
//         ELSE 0
//     END AS is_liked
// FROM Modules m
// LEFT JOIN Likes l ON m.id = l.ModuleId AND l.UserId = '019494fe-56f4-75f7-8907-e76dc77dba76'
