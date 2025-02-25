import { Sequelize, DataTypes, Model } from "sequelize";

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

    public static initialize(sequelize: Sequelize) {
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
                sequelize,
                modelName: "Reported",
                tableName: "Reported",
                timestamps: true,
            }
        );
    }
    public static setupAssociations() {
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
    }
}
export default Reported;
