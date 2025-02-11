//Tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
import jwt from "jsonwebtoken";
import privateKey from "../middlewares/auth/key";
import config from "config";
const imageCount: number = config.get("storage.nombreImageBanque");

//Modele & bdd
import { User, userCreationAttributes } from "../models/user";
import Mail from "../tools/email";

class AuthController {
    async register(userData: userCreationAttributes) {
        userData.id = UUID.v7();
        userData.isAdmin = false;
        userData.isActive = false;
        userData.token = Crypt.genToken(12);
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
        setTimeout(() => {
            Mail.verification(userData.mail, userData.token);
        }, 6000); // Attendre 3 secondes
    }

    async signin(userData: userCreationAttributes) {
        const user = await User.findOne({
            where: { mail: userData.mail },
        });

        const token = jwt.sign({ userId: user!.id }, privateKey, {
            expiresIn: "1h",
        });
        return {
            UUID: user!.id,
            token,
        };
    }

    async validation(token: string) {
        const user = await User.findOne({ where: { token: token } });

        await User.update(
            { isActive: true, token: "" },
            { where: { id: user!.id } }
        );
    }
}

export default new AuthController();
