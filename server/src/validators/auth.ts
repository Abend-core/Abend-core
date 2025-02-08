import { User, userCreationAttributes } from "../models/user";
import Crypt from "../tools/hash";

class AuthValidator {
    async register(userData: userCreationAttributes) {
        let message: string = "";

        const [mail, username] = await Promise.all([
            this.#findMail(userData.mail),
            this.#findUsername(userData.username),
        ]);
        if (username) {
            message = "Cet identifiant est déjà utilisé.";
        }
        if (userData.password.length <= 8) {
            message = "Le mot de passe doit contenir plus de 8 caractères.";
        }
        if (mail) {
            message = "Ce mail est déjà utilisé par un autre compte.";
        }
        return message;
    }

    async signin(userData: userCreationAttributes) {
        const user = await User.findOne({
            where: { mail: userData.mail },
        });

        if (!user) {
            return "Identifiant ou mot de passe incorrect.";
        }

        const isPasswordValid = await Crypt.compare(
            userData.password,
            user.password
        );

        if (!isPasswordValid) {
            return "Identifiant ou mot de passe incorrect.";
        }
    }

    async #findMail(mail: string) {
        const res = await User.findOne({ where: { mail: mail } });
        return res;
    }
    async #findUsername(username: string) {
        const res = await User.findOne({ where: { username: username } });
        return res;
    }
}

export default new AuthValidator();
