import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db";

interface UserAttributes {
    id: string;
    username: string;
    mail: string;
    image: string;
    password: string;
    abonnes: number;
    suivies: number;
    isAdmin: boolean;
    isActive: boolean;
    token: string;
}

interface userCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
    extends Model<UserAttributes, userCreationAttributes>
    implements UserAttributes
{
    public id!: string;
    public username!: string;
    public mail!: string;
    public image!: string;
    public password!: string;
    public abonnes!: number;
    public suivies!: number;
    public isAdmin!: boolean;
    public isActive!: boolean;
    public token!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "unique_username",
                msg: "Cet identifiant est déjà utilisé.",
            },
            validate: {
                notNull: {
                    msg: "L'identifiant ne doit pas être nul.",
                },
                notEmpty: {
                    msg: "L'identifiant ne doit pas être vide.",
                },
                len: {
                    args: [1, 15],
                    msg: "Trop de caractères, 15 maximum.",
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
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {},
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
                    args: [8, 64],
                    msg: "Le mot de passe doit contenir [8 à 130] caractères.",
                },
            },
        },
        abonnes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        suivies: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db.abend,
        modelName: "User",
        tableName: "Users",
    }
);

export { User, userCreationAttributes };
