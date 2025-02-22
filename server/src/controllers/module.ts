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
import Follow from "../models/follow";
import { Op } from "sequelize";

interface moduleCreate extends moduleCreationAttributes {
    tag1: string;
    tag2: string;
    tag3: string;
}

class ModuleController {
    async add(data: moduleCreate, file: Express.Multer.File) {
        Redis.deleteCache(KEYS.modules);
        data.tags = [data.tag1 ?? "", data.tag2 ?? "", data.tag3 ?? ""]
            .map((tag) => tag.toLowerCase())
            .filter((tag) => tag !== "")
            .join(", ");

        data.id = UUID.v7();
        data.isShow = true;
        data.image = file.filename;
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
            order: [["createdAt", "DESC"]],
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

                const visited = await Visited.findAll({
                    where: { ModuleId: module.id },
                    attributes: ["UserId", "Count"],
                    raw: true,
                });
                const totalVisits = visited.reduce(
                    (sum, visite) => sum + visite.Count,
                    0
                );

                return {
                    ...module.toJSON(),
                    favoris: Object.fromEntries(
                        likes.map((like) => [like.UserId, true])
                    ),
                    reported: Object.fromEntries(
                        reported.map((report) => [report.UserId, true])
                    ),
                    visite: Object.fromEntries(
                        visited.map((visite) => [visite.UserId, true])
                    ),
                    visiteCount: totalVisits,
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
        const modulesUser = modules
            .filter((module: Module) => module.user_id == userId)
            .map((module: Module) => ({
                ...module,
                isLike: !!module.favoris[userId],
                isReport: !!module.reported[userId],
            }));
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
        this.#addView(userId, ModuleId);
    }

    async moduleLikeByUser(userId: string) {
        const modules = await this.getAll();
        const moduleLikeUser = modules
            .filter((module: Module) => module.favoris[userId] == true)
            .map((module: Module) => ({
                ...module,
                isLike: !!module.favoris[userId],
                isReport: !!module.reported[userId],
            }));
        return moduleLikeUser;
    }

    async getUserData(userLog: string, userName: string) {
        let user = await User.findOne({
            attributes: { exclude: ["password", "token"] },
            where: { username: userName },
            nest: true,
            raw: true,
        });

        if (!user) return null;

        const userId = user?.id;
        const follow = await Follow.findOne({
            where: { UserId: userLog, UserIdFollow: userId },
            raw: true,
        });

        let [ModuleUser, FavorisUser] = await Promise.all([
            this.getModule(userId!),
            this.moduleLikeByUser(userId!),
        ]);
        user.isFollow = !!follow;
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
            return module.reportedCount != 0;
        });
        return modulesReported;
    }

    async #addView(UserId: string, ModuleId: string) {
        const visite = await Visited.findOne({
            where: {
                UserId: UserId,
                ModuleId: ModuleId,
            },
            raw: true,
        });
        Visited.upsert({
            UserId: UserId,
            ModuleId: ModuleId,
            Count: visite ? visite.Count + 1 : 1,
        });
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
