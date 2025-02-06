import { DataTypes, Model } from "sequelize";
import db from "../database/db";

import User from "../models/user";
import { Module } from "../models/module";

interface LikedAttributes {
    UserId: string;
    ModuleId: string;
}

class Liked extends Model<LikedAttributes> implements LikedAttributes {
    public UserId!: string;
    public ModuleId!: string;
}

Liked.init(
    {
        UserId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        ModuleId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Modules",
                key: "id",
            },
        },
    },
    {
        sequelize: db.abend,
        modelName: "Liked",
        tableName: "Likes",
        timestamps: true,
    }
);

// Jointure pour UserId
User.belongsToMany(Module, {
    through: Liked,
    foreignKey: "UserId",
    as: "likedModules",
});

// Jointure pour ModuleId
Module.belongsToMany(User, {
    through: Liked,
    foreignKey: "ModuleId",
    as: "likedByUsers",
});

export default Liked;
