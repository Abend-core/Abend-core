// Table d'association automatique avec des colonnes UserId et ProjectId
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

import User from "../models/user";
import Module from "../models/module";

const Visited = sequelize.define("Visited", {
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
});

// Configurer les associations
User.belongsToMany(Module, { through: Visited });
Module.belongsToMany(User, { through: Visited });

export default Visited;
