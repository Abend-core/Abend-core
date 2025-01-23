import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

import User from "../models/user";
import Module from "../models/module";

const Liked = sequelize.define("Liked", {});

// Configurer les associations
User.belongsToMany(Module, { through: Liked });
Module.belongsToMany(User, { through: Liked });
