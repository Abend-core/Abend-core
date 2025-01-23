import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

import User from "../models/user";
import Module from "../models/module";

const Liked = sequelize.define("Like", {
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
User.belongsToMany(Module, { through: Liked });
Module.belongsToMany(User, { through: Liked });

export default Liked;
