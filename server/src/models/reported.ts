import { DataTypes, Model } from "sequelize";
import db from "../database/db";

import { User } from "../models/user";
import { Module } from "../models/module";

// Interface des attributs de Reported
interface ReportedAttributes {
    UserId: string;
    ModuleId: string;
}

// Définition du modèle avec TypeScript
class Reported extends Model<ReportedAttributes> implements ReportedAttributes {
    public UserId!: string;
    public ModuleId!: string;
}

Reported.init(
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
        modelName: "Reported",
        tableName: "Reported",
        timestamps: true,
    }
);

// Jointure pour UserId
User.belongsToMany(Module, {
    through: Reported,
    foreignKey: "UserId",
    as: "reportedModules",
});

// Jointure pour ModuleId
Module.belongsToMany(User, {
    through: Reported,
    foreignKey: "ModuleId",
    as: "reportedByUsers",
});

export default Reported;
