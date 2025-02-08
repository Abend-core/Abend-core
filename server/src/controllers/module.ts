//Tools
import UUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import Redis, { KEYS } from "../tools/redis";
//Model & bdd
import { Module, moduleCreationAttributes } from "../models/module";
import Like from "../models/liked";
import Visited from "../models/visited";
import { User } from "../models/user";
import { Op } from "sequelize";

interface ModuleWithFavoris extends Module {
    favoris: boolean;
}

class ModuleController {
    async add(data: moduleCreationAttributes, file: Express.Multer.File) {
        Redis.deleteCache(KEYS.modules);
        data.id = UUID.v7();
        data.isShow = true;
        data.isAlert = false;
        data.image = file.filename;
        if (!file) {
            throw new Error("Bad request.");
        }
        await Module.create(data);
    }

    async update(moduleId: string, data: moduleCreationAttributes) {
        Redis.deleteCache(KEYS.modules);
        const module = await Module.findByPk(moduleId);
        if (!module) {
            throw new Error("Bad request.");
        }
        await Module.update(data, {
            where: { id: moduleId },
        });
    }

    async getAll() {
        const cache = await Redis.getCache(KEYS.modules);
        if (cache) {
            return cache;
        }
        const modules = await Module.findAll({
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["id", "username", "isAdmin"],
                },
            ],
            nest: true,
        });
        // Utiliser toJSON() pour éviter les erreurs de référence circulaire
        const modulesJson = modules.map((module) => module.toJSON());
        Redis.setCache(KEYS.modules, modulesJson);
        return modulesJson;
    }

    async showAdmin() {
        const modules = await this.getAll();
        const moduleAdmin = modules.filter(
            (module: Module) => module.User.isAdmin === true
        );
        return moduleAdmin;
    }

    async getModule(userId: string) {
        const modules = await this.getAll();
        const moduleUser = modules.filter(
            (module: Module) => module.user_id == userId
        );
        return moduleUser;
    }

    async show(userId: string) {
        const modules = await this.getAll();
        const moduleShow = modules.filter(
            (module: Module) => module.isShow === true
        );

        const modulesId = moduleShow.map((module: Module) => module.id);

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
        const formattedModules = moduleShow.map((module: Module) => ({
            ...module,
            favoris: likedModuleIds.has(module.id.toString()),
        }));
        return formattedModules;
    }

    async hide(userId: string) {
        const modules = await this.getAll();
        const moduleHide = modules.filter(
            (module: Module) => module.isShow === false
        );

        const modulesId = moduleHide.map((module: Module) => module.id);

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
        const formattedModules = moduleHide.map((module: Module) => ({
            ...module,
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
    }

    async toggleView(userId: string, ModuleId: string) {
        const result = await Visited.findOne({
            where: { UserId: userId, ModuleId: ModuleId },
        });
        if (result) {
            return;
        }
        this.#addView(userId, ModuleId);
    }

    async moduleLikeByUser(userId: string) {
        const modules = await this.show(userId);
        const likedModules = modules.filter(
            (module: ModuleWithFavoris) => module.favoris == true
        );
        return likedModules;
    }

    async getUserData(userName: string) {
        const user = await User.findOne({
            attributes: { exclude: ["password", "token"] },
            where: { username: userName },
        });

        if (!user) {
            throw new Error("User not found");
        }
        const userId = user?.id;
        const [ModuleUser, FavorisUser] = await Promise.all([
            this.getModule(userId),
            this.moduleLikeByUser(userId),
        ]);
        return { user, ModuleUser, FavorisUser };
    }

    async filtre(search: string) {
        const modules = Module.findAll({
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["username", "isAdmin"],
                },
            ],
            where: {
                [Op.or]: [
                    { name: { [Op.like]: "%" + search + "%" } },
                    { "$User.username$": { [Op.like]: "%" + search + "%" } },
                ],
            },
        });
        return modules;
    }

    async delete(moduleId: string) {
        Redis.deleteCache(KEYS.modules);
        const module = await Module.findByPk(moduleId);
        if (!module) {
            return;
        }
        const dataModule = module.get();
        const fileDelete = path.join("./src/uploads/module/", dataModule.image);
        fs.promises.unlink(fileDelete);
        await Module.destroy({ where: { id: moduleId } });
    }

    #addView(UserId: string, ModuleId: string) {
        Visited.create({ UserId: UserId, ModuleId: ModuleId });
        Module.increment("views", { where: { id: ModuleId } });
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
