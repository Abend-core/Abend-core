//Tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
import jwt from "jsonwebtoken";
import privateKey from "../middleware/auth/key";
import config from "config";
const imageCount: number = config.get("storage.nombreImageBanque");

//Modele & bdd
import User from "../models/user";

class AuthController {
    async register(userData: any) {
        userData.id = UUID.v7();

        if (!userData.image) {
            userData.image = `bank-img-${Math.trunc(
                Math.random() * imageCount
            )}.png`;
        }

        const user = await User.create(userData);
        user.password = await Crypt.hash(user.password);

        await User.update(
            { password: user.password },
            { where: { id: user.id }, validate: false }
        );
    }

    async signin(userData: any) {
        const user = await User.findOne({
            where: { mail: userData.mail },
        });

        if (!user) {
            throw new Error("Identifiant ou mot de passe incorrect.");
        }

        const isPasswordValid = await Crypt.compare(
            userData.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Identifiant ou mot de passe incorrect.");
        }

        const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: "1h",
        });
        return {
            UUID: user.id,
            token,
        };
    }
}

export default new AuthController();
