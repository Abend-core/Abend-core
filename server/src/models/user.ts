import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

interface UserAttributes {
  id: number;
  name: string;
  firstname: string;
  mail: string;
  birth: Date;
  login: string;
  password: string;
  isAdmin: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public firstname!: string;
  public mail!: string;
  public birth!: Date;
  public login!: string;
  public password!: string;
  public isAdmin!: boolean;
}

User.init(
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
      unique: true,
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
        isDate: true,
      },
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
