import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db";
import { User } from "../models/user";

interface moduleAttributes {
    id: string;
    name: string;
    link: string;
    image: string;
    content: string;
    tags: string;
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
    public id!: string;
    public name!: string;
    public link!: string;
    public image!: string;
    public content!: string;
    public tags!: string;
    public views!: number;
    public likes!: number;
    public isShow!: boolean;
    public user_id!: string;
    public User: any;
    public favoris!: any;
    public reported!: any;
    public reportedCount!: number;
    public isLiked!: boolean;
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
            unique: {
                name: "unique_name",
                msg: "Ce nom est déjà utilisé.",
            },
            validate: {
                notNull: {
                    msg: "Le nom du module ne doit pas être null.",
                },
                notEmpty: {
                    msg: "Le nom du module ne doit pas être vide.",
                },
                len: {
                    args: [1, 26],
                    msg: "Trop de caractères, 26 maximum.",
                },
            },
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "unique_name",
                msg: "Ce lien est déjà utilisé.",
            },
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
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "L'image du module ne doit pas être vide.",
                },
                len: {
                    args: [1, 255],
                    msg: "Trop de caractères, 255 maximum.",
                },
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "L'image du module ne doit pas être vide.",
                },
                len: {
                    args: [1, 120],
                    msg: "Trop de caractères, 120 maximum.",
                },
            },
        },
        tags: {
            type: DataTypes.STRING,
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
        sequelize: db.abend,
        modelName: "Module",
        tableName: "Modules",
    }
);

//Jointure User
User.hasMany(Module, {
    onDelete: "CASCADE",
    foreignKey: "user_id",
});
Module.belongsTo(User, { foreignKey: "user_id", as: "User" });

export { Module, moduleCreationAttributes };
