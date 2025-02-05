//Tools
import UUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import Image from "../tools/multer";
import Redis from "../tools/redis";
//Model & bdd
import Module from "../models/module";
import Like from "../models/liked";
import Visited from "../models/visited";
import User from "../models/user";
import { Op, Sequelize } from "sequelize";
//Middleware
import auth from "../middleware/auth/auth";

class ModuleController {
    async show(userId: string) {
        const modules = await Module.findAll({
            where: { isShow: true },
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["username", "isAdmin"],
                },
            ],
        });

        const modulesId = modules.map((module) => module.id);

        const likedModules = await Like.findAll({
            where: {
                ModuleId: modulesId,
                UserId: userId,
            },
            attributes: ["ModuleId"],
        });
        const likedModuleIds = new Set(
            likedModules.map((like) => like.ModuleId)
        );
        const formattedModules = modules.map((module) => ({
            ...module.toJSON(),
            favoris: likedModuleIds.has(module.id.toString()),
        }));
        return formattedModules;
    }
    async hide(userId: string) {
        const modules = await Module.findAll({
            where: { isShow: false },
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["username", "isAdmin"],
                },
            ],
        });

        const modulesId = modules.map((module) => module.id);

        const likedModules = await Like.findAll({
            where: {
                ModuleId: modulesId,
                UserId: userId,
            },
            attributes: ["ModuleId"],
        });
        const likedModuleIds = new Set(
            likedModules.map((like) => like.ModuleId)
        );
        const formattedModules = modules.map((module) => ({
            ...module.toJSON(),
            favoris: likedModuleIds.has(module.id.toString()),
        }));
        return formattedModules;
    }
    async toggleLike(userId: string, ModuleId: string) {
        const result = await Like.findOne({
            where: { UserId: userId, ModuleId: ModuleId },
        });
        if (result) {
            this.#deleteLike(userId, ModuleId);
            return;
        }
        this.#addLike(userId, ModuleId);
        return;
    }
    async moduleLikeByUser(userId: string) {
        const modules = await this.show(userId);
        const likedModules = modules.filter(
            (module) => module.favoris === true
        );

        return likedModules;
    }
    #deleteLike(UserId: string, ModuleId: string) {
        Like.destroy({
            where: { UserId: UserId, ModuleId: ModuleId },
        });
        Module.decrement("likes", { where: { id: ModuleId } });
    }
    #addLike(UserId: string, ModuleId: string) {
        Like.create({ UserId: UserId, ModuleId: ModuleId });
        Module.increment("likes", { where: { id: ModuleId } });
    }
}

export default new ModuleController();
