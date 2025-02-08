import { User, userCreationAttributes } from "../models/user";
import Crypt from "../tools/hash";
interface passObj {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

class UserValidator {
    async data(userData: userCreationAttributes) {
        let message: string = "";

        const [mail, username] = await Promise.all([
            this.#findMail(userData.mail),
            this.#findUsername(userData.username),
        ]);
        if (username) {
            message = "Cet identifiant est déjà utilisé.";
        }
        if (userData.username.length < 3 || userData.username.length > 15) {
            message = "L'identifiant doit faire entre 3 et 15 caractères.";
        }
        if (mail) {
            message = "Ce mail est déjà utilisé par un autre compte.";
        }

        return message;
    }

    async found(userId: string) {
        const user = await User.findByPk(userId);
        return user;
    }

    async password(data: passObj, userId: string) {
        let message: string = "";
        const user = await User.findByPk(userId);
        const validPassword = await Crypt.compare(
            data.password,
            user!.password
        );

        if (data.newPassword.length <= 8) {
            message = "Le mot de passe doit contenir plus de 8 caractères.";
        }
        if (data.newPassword != data.confirmPassword) {
            message = "Les mots de passe ne sont pas identiques.";
        }
        if (!validPassword) {
            message = "Erreur dans la saisie du mot de passe.";
        }
        return message;
    }

    async hasFile(file: Express.Multer.File) {
        let message = "";
        if (!file) {
            message = "Aucun fichier téléchargé.";
        }
        return message;
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

export default new UserValidator();
