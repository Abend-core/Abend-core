//Model & bdd
import { User, userCreationAttributes } from "../models/user";
import { Module, moduleCreationAttributes } from "../models/module";
import Follow from "../models/follow";
import { Op } from "sequelize";

//Tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import config from "config";
import Redis, { KEYS } from "../tools/redis";

const image: number = config.get("storage.nombreImageBanque");
interface passObj {
    password: string;
    newPassword: string;
    confirmPassword: string;
}
class UserController {
    async add(userData: userCreationAttributes) {
        userData.id = UUID.v7();
        userData.image =
            "bank-img-" + Math.trunc(Math.random() * image) + ".png";
        userData.password = "password1";
        userData.isActive = true;
        await User.create(userData);
        userData.password = await Crypt.hash(userData.password);
        await User.update(userData, {
            where: { id: userData.id },
            validate: false,
        });
    }

    async getAll() {
        const users = User.findAll({
            attributes: { exclude: ["password", "token"] },
            order: [["createdAt", "desc"]],
        });
        return users;
    }

    async getOne(userId: string) {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password", "token"] },
        });
        return user;
    }

    async update(userId: string, userData: userCreationAttributes) {
        await User.update(userData, { where: { id: userId } });
    }

    async filtre(search: string) {
        const users = await User.findAll({
            attributes: { exclude: ["password", "token"] },
            where: {
                [Op.or]: [
                    { username: { [Op.like]: "%" + search + "%" } },
                    { mail: { [Op.like]: "%" + search + "%" } },
                ],
            },
        });
        return users;
    }

    async password(userId: string, data: passObj) {
        const user = await User.findByPk(userId);
        user!.password = await Crypt.hash(data.newPassword);
        const userData = user!.get();
        await this.update(userId, userData);
    }

    async image(userData: userCreationAttributes, file: Express.Multer.File) {
        const user = await User.findOne({ where: { id: userData.id } });

        if (!user!.image.includes("bank")) {
            const fileDelete = path.join("./src/uploads/profil/", user!.image);
            await fs.promises.unlink(fileDelete);
        }
        user!.image = file.filename;
        const data = user!.get();
        await this.update(data.id, data);
    }

    async delete(userId: string) {
        Redis.deleteCache(KEYS.modules);
        const user = await User.findByPk(userId);
        const modules = await Module.findAll({
            where: { user_id: userId },
        });
        await Promise.all(
            modules.map(async (module) => {
                const fileDeleteModule = path.join(
                    "./src/uploads/module/",
                    module.image
                );
                await fs.promises.unlink(fileDeleteModule);
            })
        );
        if (!user!.image.includes("bank")) {
            const fileDeleteUser = path.join(
                "./src/uploads/profil/",
                user!.image
            );
            await fs.promises.unlink(fileDeleteUser);
        }
        await Promise.all([
            Module.destroy({ where: { user_id: userId } }),
            User.destroy({ where: { id: userId } }),
        ]);
    }
    async toggleActive(userId: string) {
        const user = await User.findByPk(userId);
        const userData = user?.get();
        if (user?.isActive === true) {
            userData!.isActive = false;
        }
        userData!.isActive = false;
        await this.update(userId, userData!);
    }
    async follower(userId: string, userIdFollow: string) {
        const result = await Follow.findOne({
            where: { UserId: userId, UserIdFollow: userIdFollow },
        });
        if (result) {
            this.#deleteFollow(userId, userIdFollow);
            return;
        }
        this.#addFollow(userId, userIdFollow);
    }

    async getFollow(userId: string) {
        const [followings, followers] = await Promise.all([
            Follow.findAll({ where: { UserId: userId } }),
            Follow.findAll({ where: { UserIdFollow: userId } }),
        ]);
        return { followings, followers };
    }

    #deleteFollow(userId: string, userIdFollow: string) {
        Follow.destroy({
            where: { UserId: userId, UserIdFollow: userIdFollow },
        });
        User.decrement("abonnes", { where: { id: userIdFollow } });
        User.decrement("suivies", { where: { id: userId } });
    }

    #addFollow(userId: string, userIdFollow: string) {
        Follow.create({ UserId: userId, UserIdFollow: userIdFollow });
        User.increment("abonnes", { where: { id: userIdFollow } });
        User.increment("suivies", { where: { id: userId } });
    }
}

export default new UserController();
