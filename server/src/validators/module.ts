import { User, userCreationAttributes } from "../models/user";
import { Module, moduleCreationAttributes } from "../models/module";

class ModuleValidator {
    async data(moduleData: moduleCreationAttributes) {
        let message: string = "";

        const [mail, link] = await Promise.all([
            this.#findName(moduleData.name),
            this.#checkLink(moduleData.link),
        ]);
        if (link) {
            message = "Le lien n'est pas au bon format.";
        }
        if (mail) {
            message = "Ce mail est déjà utilisé par un autre compte.";
        }
        return message;
    }

    async foundUser(userId: string) {
        const user = await User.findByPk(userId);
        return user;
    }
    async foundUserByUsername(userUsername: string) {
        const user = await User.findOne({
            where: { username: userUsername },
        });
        return user;
    }
    async foundModule(moduleId: string) {
        const module = await Module.findByPk(moduleId);
        return module;
    }

    async hasFile(file: Express.Multer.File) {
        let message = "";
        if (!file) {
            message = "Aucun fichier téléchargé.";
        }
        return message;
    }

    async #findName(name: string) {
        const res = await Module.findOne({ where: { name: name } });
        return res;
    }
    #checkLink(link: string): string {
        let message: string = "";
        if (link.includes("https://") == false) {
            message = "Le lien n'est pas au bon format.";
            return message;
        }
        const parts = link.split("//");
        if (parts[0] != "https:") {
            message = "Le lien n'est pas au bon format.";
            return message;
        }

        const domainExtension = parts[1];
        const split = domainExtension.split(".");
        for (let i = 0; i < split.length - 1; i++) {
            message = this.#blackList(split[i]);
        }
        if (message != "ok") {
            return message;
        }
        message = this.#whiteList(split[split.length - 1]);

        return message;
    }
    #whiteList(text: string): string {
        const listeExtension: Array<string> = [
            "fr",
            "com",
            "org",
            "app",
            "net",
            "pt",
            "es",
            "pro",
            "de",
            "ru",
            "ir",
            "in",
            "uk",
            "au",
            "ua",
            "tv",
            "de",
            "online",
            "info",
            "eu",
            "tk",
            "cn",
            "xyz",
            "site",
            "top",
            "icu",
        ];

        const containsExtension = listeExtension.some((extension) =>
            text.includes(extension)
        );
        if (!containsExtension) {
            return "Le lien n'est pas au bon format.";
        }

        return "ok";
    }

    #blackList(text: string): string {
        const listeDomaine: Array<string> = [
            "porn",
            "porno",
            "sexe",
            "adult",
            "xxx",
            "sex",
            "onlyfans",
            "escort",
            "camgirl",
            "casino",
            "gambling",
            "bet",
            "poker",
            "ads",
        ];
        // Construire une expression régulière pour détecter des mots interdits
        const regex = new RegExp(`\\b(${listeDomaine.join("|")})\\b`, "i");

        // Vérifier si le texte correspond à la liste des mots interdits
        if (regex.test(text)) {
            return "Le lien n'est pas au bon format.";
        }

        return "ok";
    }
}

export default new ModuleValidator();
