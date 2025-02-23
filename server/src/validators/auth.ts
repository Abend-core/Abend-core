import { User, userCreationAttributes } from "../models/user";
import Crypt from "../tools/hash";
interface ReiniPass {
    token: string;
    newPassword: string;
    confirmPassword: string;
}
class AuthValidator {
    async register(userData: Partial<userCreationAttributes>) {
        const [mail, username] = await Promise.all([
            this.#findMail(userData.mail!),
            this.#findUsername(userData.username!),
        ]);
        if (username) {
            return "Cet identifiant est déjà utilisé.";
        }
        if (userData.password!.length <= 8) {
            return "Le mot de passe doit contenir plus de 8 caractères.";
        }
        if (mail) {
            return "Ce mail est déjà utilisé par un autre compte.";
        }
    }

    async signin(userData: Partial<userCreationAttributes>) {
        const user = await User.findOne({
            where: { mail: userData.mail },
        });

        if (!user) {
            return "Identifiant ou mot de passe incorrect.";
        }

        const isPasswordValid = await Crypt.compare(
            userData.password!,
            user.password
        );

        if (!isPasswordValid) {
            return "Identifiant ou mot de passe incorrect.";
        }

        const active = await this.#mailActive(userData.mail!);
        if (active) {
            return active;
        }
    }

    async validation(token: string) {
        const user = await User.findOne({
            where: { token: token },
        });

        if (!user) {
            return "Mauvais token.";
        }
    }

    async forgot(mail: string) {
        const user = await User.findOne({
            where: { mail: mail },
        });

        if (!user) {
            return "Ce mail n'existe pas.";
        }
    }

    async updatepassword(data: ReiniPass) {
        const user = await User.findOne({ where: { token: data.token } });

        if (!user) {
            return "Ce token n'est pas valide.";
        }
        if (data.confirmPassword.length < 8) {
            return "Le mot de passe doit contenir plus de 8 caractères.";
        }
        if (data.confirmPassword !== data.newPassword) {
            return "Les mots de passe ne sont pas identiques.";
        }
        const isPasswordValid = await Crypt.compare(
            data.confirmPassword,
            user.password
        );
        if (isPasswordValid) {
            return "Ce mot de passe est utilisé, merci d'utiliser un nouveau mot de passe.";
        }
    }

    async #findMail(mail: string) {
        const res = await User.findOne({ where: { mail: mail } });
        return res;
    }
    async #mailActive(mail: string) {
        const user = await User.findOne({ where: { mail: mail } });
        if (user?.isActive === false) {
            return "L'adresse mail n'a pas été vérifié.";
        }
    }
    async #findUsername(username: string) {
        const res = await User.findOne({ where: { username: username } });
        return res;
    }
}

export default new AuthValidator();
