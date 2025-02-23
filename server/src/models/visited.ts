import { Sequelize, DataTypes, Model } from "sequelize";
import { User } from "../models/user";
import { Module } from "../models/module";

// Interface des attributs de Visited
interface VisitedAttributes {
    UserId: string;
    ModuleId: string;
    Count: number;
}

// Définition du modèle avec TypeScript
class Visited extends Model<VisitedAttributes> implements VisitedAttributes {
    public UserId!: string;
    public ModuleId!: string;
    public Count!: number;
    public totalCount!: number;

    public static initialize(sequelize: Sequelize) {
        Visited.init(
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
                Count: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Visited",
                tableName: "Visited",
                timestamps: true,
            }
        );
    }
    public static setupAssociations() {
        // Jointure pour UserId
        User.belongsToMany(Module, {
            through: Visited,
            foreignKey: "UserId",
            as: "visitedModules",
        });

        // Jointure pour ModuleId
        Module.belongsToMany(User, {
            through: Visited,
            foreignKey: "ModuleId",
            as: "visitedByUsers",
        });
    }
}
export default Visited;
