import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

interface StatutAttributes {
  id: number;
  name: string;
}

interface StatutCreationAttributes extends Optional<StatutAttributes, "id"> {}

class Statut
  extends Model<StatutAttributes, StatutCreationAttributes>
  implements StatutAttributes
{
  public id!: number;
  public name!: string;
}

Statut.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Le nom du statut ne doit pas être null.",
        },
        notEmpty: {
          msg: "Le nom du statut ne doit pas être vide.",
        },
        len: {
          args: [1, 255],
          msg: "Trop de caractères, 255 maximum.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Statut",
    tableName: "Statuts",
  }
);

export default Statut;
