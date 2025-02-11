//Tools
import UUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import Redis, { KEYS } from "../tools/redis";
//Model & bdd
import { Module, moduleCreationAttributes } from "../models/module";
import Like from "../models/liked";
import Visited from "../models/visited";
import Reported from "../models/reported";
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
        const modulesJson = await Promise.all(
            modules.map(async (module) => {
                const likes = await Like.findAll({
                    where: { ModuleId: module.id },
                    attributes: ["UserId"],
                    raw: true,
                });

                const reported = await Reported.findAll({
                    where: { ModuleId: module.id },
                    attributes: ["UserId"],
                    raw: true,
                });

                return {
                    ...module.toJSON(),
                    favoris: Object.fromEntries(
                        likes.map((like) => [like.UserId, true])
                    ),
                    reported: Object.fromEntries(
                        reported.map((report) => [report.UserId, true])
                    ),
                    favorisCount: likes.length,
                    reportedCount: reported.length,
                };
            })
        );
        Redis.setCache(KEYS.modules, modulesJson);
        return modulesJson;
    }

    async showAdmin() {
        const modules = await this.getAll();

        const adminModules = modules
            .filter((module: Module) => module.User.isAdmin === true)
            .map((module: Module) => ({
                ...module,
            }));

        return adminModules;
    }

    async getModule(userId: string) {
        const modules = await this.getAll();
        const modulesUser = modules.filter(
            (module: Module) => module.user_id == userId
        );
        return modulesUser;
    }

    async show(userId: string) {
        const modules = await this.getAll();

        const showModules = modules
            .filter((module: Module) => module.isShow === true)
            .map((module: Module) => ({
                ...module,
                isLike: !!module.favoris[userId],
                isReport: !!module.reported[userId],
            }));

        return showModules;
    }

    async hide(userId: string) {
        const modules = await this.getAll();

        const hideModules = modules
            .filter((module: Module) => module.isShow === false)
            .map((module: Module) => ({
                ...module,
                isLike: !!module.favoris[userId],
                isReport: !!module.reported[userId],
            }));

        return hideModules;
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

    async toggleReport(userId: string, ModuleId: string) {
        const result = await Reported.findOne({
            where: { UserId: userId, ModuleId: ModuleId },
        });
        if (!result) {
            await this.#addReported(userId, ModuleId);
            await this.#hideModule(ModuleId);
        }
        return;
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
        const modules = await this.getAll();
        const moduleLikeUser = modules.filter(
            (module: Module) => module.favoris[userId] == true
        );
        return moduleLikeUser;
    }

    async getUserData(userName: string) {
        const user = await User.findOne({
            attributes: { exclude: ["password", "token"] },
            where: { username: userName },
        });

        const userId = user?.id;
        const [ModuleUser, FavorisUser] = await Promise.all([
            this.getModule(userId!),
            this.moduleLikeByUser(userId!),
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

    async delete(ModuleId: string) {
        Redis.deleteCache(KEYS.modules);
        const module = await Module.findByPk(ModuleId);
        if (!module) {
            return;
        }
        const dataModule = module.get();
        const fileDelete = path.join("./src/uploads/module/", dataModule.image);
        fs.promises.unlink(fileDelete);
        await Module.destroy({ where: { id: ModuleId } });
    }

    async getReported() {
        const modules = await this.getAll();
        const modulesReported = modules.filter((module: Module) => {
            module.reportedCount != 0;
        });
        return modulesReported;
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
    #addReported(UserId: string, ModuleId: string) {
        Reported.create({ UserId: UserId, ModuleId: ModuleId });
    }
    async #hideModule(ModuleId: string) {
        const number = await Reported.count({ where: { ModuleId: ModuleId } });
        if (number > 5) {
            Module.update({ isShow: false }, { where: { id: ModuleId } });
        }
    }
}

export default new ModuleController();
