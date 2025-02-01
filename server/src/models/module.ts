import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

import Etat from "../models/etat";
import User from "../models/user";

interface moduleAttributes {
    id: number;
    name: string;
    link: string;
    image: string;
    content: string;
    views: number;
    likes: number;
    isShow: boolean;
    etat_id: number;
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
    public image!: string;
    public content!: string;
    public views!: number;
    public likes!: number;
    public isShow!: boolean;
    public etat_id!: number;
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
        etat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Etats",
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

//Jointure Etat
Etat.hasMany(Module, {
    foreignKey: "etat_id",
    as: "Modules",
});

Module.belongsTo(Etat, {
    foreignKey: "etat_id",
    as: "Etat",
});

//Jointure User
User.hasMany(Module, {
    onDelete: "CASCADE",
    foreignKey: "user_id",
});
Module.belongsTo(User, {
    foreignKey: "user_id",
});

export default Module;
