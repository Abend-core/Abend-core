import { User, userCreationAttributes } from "../models/user";
import { Module, moduleCreationAttributes } from "../models/module";

class ModuleValidator {
    async data(moduleData: moduleCreationAttributes) {
        let tags: string | undefined;
        if (moduleData.tags) {
            tags = await this.#checkTags(moduleData.tags);
        }
        const [name, link] = await Promise.all([
            this.#findName(moduleData.name),
            this.#checkLink(moduleData.link),
        ]);
        if (link) {
            return link;
        }
        if (name) {
            return "Ce nom de module est déjà pris.";
        }
        if (tags) {
            return tags;
        }
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

    #checkTags(tags: string) {
        console.log(tags)
        if(tags.length > 3){
            return "Il ne peux pas avoir plus de 3 tags."
        }
        
        for (let i = 0; i < tags.length - 1; i++) {
            const res = this.#blackList(tags[i]);
            if (res) {
                return "Ce tag n'est pas autorisé.";
            }
            if(tags[i] === ""){
                continue;
            }
            if(tags[i].length > 5){
                return "Un tag peut contenir 5 caractères maximum."
            }
        }
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
            const res = this.#blackList(parts[i]);
            if (res) {
                return "Ce nom de domaine n'est pas autorisé.";
            }
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
            return "Cette extension n'est pas accepter.";
        }

        return "";
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

        return "";
    }
}

export default new ModuleValidator();
