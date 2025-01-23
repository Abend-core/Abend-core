// Table d'association automatique avec des colonnes UserId et ProjectId
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

import User from "../models/user";
import Module from "../models/module";

const Visited = sequelize.define("Visited", {});

// Configurer les associations
User.belongsToMany(Module, { through: Visited });
Module.belongsToMany(User, { through: Visited });
