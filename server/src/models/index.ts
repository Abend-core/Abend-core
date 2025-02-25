import { Sequelize } from "sequelize";

import Follow from "./follow";
import Liked from "./liked";
import { Module } from "./module";
import Notification from "./notification";
import Reported from "./reported";
import Tag from "./tag";
import { User } from "./user";
import Visited from "./visited";

export const models = [
    Follow,
    Liked,
    Module,
    Notification,
    Reported,
    Tag,
    User,
    Visited,
];

export async function initializeAllModels(sequelize: Sequelize) {
    // Étape 1 : Initialise tous les modèles
    for (const model of models) {
        model.initialize(sequelize);
    }

    // Étape 2 : Configure les associations
    for (const model of models) {
        model.setupAssociations();
    }
}

export { User, Module, Follow, Liked, Notification, Reported, Tag, Visited };
