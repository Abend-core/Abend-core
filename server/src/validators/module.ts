import { User } from "../models/user";
import { Module, moduleCreationAttributes } from "../models/module";

interface moduleCreate extends moduleCreationAttributes {
    tag1: string;
    tag2: string;
    tag3: string;
}

class ModuleValidator {
    async data(moduleData: Partial<moduleCreate>) {
        let tags: string | undefined;
        tags = await this.#checkTags(
            moduleData.tag1!,
            moduleData.tag2!,
            moduleData.tag3!
        );
        if (moduleData.name) {
            var name = await this.#findName(moduleData.name);
        }
        if (moduleData.link) {
            var link = await this.#checkLink(moduleData.link);
        }

        if (link!) {
            return link;
        }
        if (name!) {
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
        if (!file) {
            return "Aucun fichier téléchargé.";
        }
    }

    async #findName(name: string) {
        const res = await Module.findOne({ where: { name: name } });
        return res;
    }

    async #checkTags(tag1: string, tag2: string, tag3: string) {
        const tabTags = [tag1 ?? "", tag2 ?? "", tag3 ?? ""];

        for (let i = 0; i < tabTags.length - 1; i++) {
            const res = await this.#blackList(tabTags[i]);
            if (!tabTags[i]) continue;
            if (res) {
                return "Ce tag n'est pas autorisé.";
            }

            if (tabTags[i].length > 5) {
                return "Un tag peut contenir 5 caractères maximum.";
            }
        }
    }

    async #checkLink(link: string) {
        if (link.includes("https://") == false) {
            return "Le lien n'est pas au bon format.";
        }
        const parts = link.split("//");
        if (parts[0] != "https:") {
            return "Le lien n'est pas au bon format.";
        }

        const domainExtension = parts[1];
        const split = domainExtension.split(".");
        for (let i = 0; i < split.length - 1; i++) {
            const resBlack = await this.#blackList(split[i]);
            if (resBlack) {
                return resBlack;
            }
        }
        const reswhite = await this.#whiteList(split[split.length - 1]);
        if (reswhite) {
            return reswhite;
        }
    }
    #whiteList(text: string) {
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
            "io",
        ];

        const containsExtension = listeExtension.some(
            (extension) => text === extension
        );
        if (!containsExtension) {
            return "Cette extension n'est pas accepter.";
        }
    }

    #blackList(text: string) {
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
            return "Le nom de domaine n'est pas autorisé.";
        }
    }
}

export default new ModuleValidator();
