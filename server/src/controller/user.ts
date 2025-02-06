//Model & bdd
import { User, userCreationAttributes } from "../models/user";
import { Op } from "sequelize";

//Tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import config from "config";

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
        await User.create(userData);
        userData.password = await Crypt.hash(userData.password);
        await User.update(userData, {
            where: { id: userData.id },
            validate: false,
        });
        return;
    }

    async getAll() {
        const users = User.findAll({
            order: [["createdAt", "desc"]],
        });
        return users;
    }

    async getOne(userId: string) {
        const user = await User.findByPk(userId);
        return user;
    }

    async update(userId: string, userData: userCreationAttributes) {
        const [mailUser, usernameUser] = await Promise.all([
            User.findOne({
                where: { mail: userData.mail, id: { [Op.ne]: userId } },
            }),
            User.findOne({
                where: { username: userData.username, id: { [Op.ne]: userId } },
            }),
        ]);
        if (mailUser) {
            throw new Error("Ce mail est déjà utilisé par un autre compte.");
        }
        if (usernameUser) {
            throw new Error(
                "Ce nom d'utilisateur est déjà utilisé par un autre compte."
            );
        }

        await User.update(userData, { where: { id: userId } });
        return;
    }

    async filtre(search: string) {
        const users = await User.findAll({
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
        if (!user) {
            throw new Error("User not found");
        }
        const validPassword = await Crypt.compare(data.password, user.password);

        if (!validPassword) {
            throw new Error("Bad request.");
        }

        if (data.newPassword.length < 8) {
            throw new Error(
                "Le mot de passe doit avoir au moins 8 caractères."
            );
        }

        if (data.newPassword != data.confirmPassword) {
            throw new Error("Les mots de passe ne correspondent pas.");
        }

        user.password = await Crypt.hash(data.newPassword);
        const userData = user.get();
        await this.update(userId, userData);
        return;
    }

    async image(userData: userCreationAttributes, file: Express.Multer.File) {
        if (!file) {
            throw new Error("Bad request.");
        }
        const user = await User.findOne({ where: { id: userData.id } });
        console.log("Premier : ", user);
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.image.includes("bank")) {
            const fileDelete = path.join("./src/uploads/profil/", user.image);
            console.log("File a suprimer :", fileDelete);
            await fs.promises.unlink(fileDelete);
        }
        user.image = file.filename;
        const data = user.get();

        await this.update(data.id, data);
        return;
    }
}

export default new UserController();
