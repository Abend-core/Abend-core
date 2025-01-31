import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

import User from "../models/user";
import Module from "../models/module";

// Interface des attributs de Visited
interface VisitedAttributes {
  UserId: string;
  ModuleId: string;
}

// Définition du modèle avec TypeScript
class Visited extends Model<VisitedAttributes> implements VisitedAttributes {
  public UserId!: string;
  public ModuleId!: string;
}

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
  },
  {
    sequelize,
    modelName: "Visited",
    tableName: "Visited",
    timestamps: true,
  }
);

User.belongsToMany(Module, { through: Visited, foreignKey: "UserId", as: "visitedModules" });
Module.belongsToMany(User, { through: Visited, foreignKey: "ModuleId", as: "visitedByUsers" });

export default Visited;
