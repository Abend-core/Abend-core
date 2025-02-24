import { User } from "../models/user";
import https from "https";
import { Module, moduleCreationAttributes } from "../models/module";

interface moduleCreate extends moduleCreationAttributes {
    tag1: string;
    tag2: string;
    tag3: string;
}

class ModuleValidator {
    async data(moduleData: Partial<moduleCreate>): Promise<string | undefined> {
        try {
            // Vérification des tags
            const tagsError = await this.#checkTags(
                moduleData.tag1 ?? "",
                moduleData.tag2 ?? "",
                moduleData.tag3 ?? ""
            );
            if (tagsError) {
                return tagsError;
            }

            // Vérification du nom
            if (moduleData.name) {
                const existingModule = await this.#findName(moduleData.name);
                if (existingModule) {
                    return "Ce nom de module est déjà pris.";
                }
            }

            // Vérification du lien
            if (moduleData.link) {
                const linkResult = await this.checkUrlValidity(moduleData.link);
            }

            // Si tout passe, pas d’erreur
            return undefined;
        } catch (error) {
            // Capturer toutes les erreurs possibles (ex. rejection de checkUrlValidity)
            return error instanceof Error ? error.message : String(error);
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

            if (tabTags[i].length > 7) {
                return "Un tag peut contenir 7 caractères maximum.";
            }
        }
    }

    // Fonction pour vérifier la validité d’un lien
    checkUrlValidity(urlString: string): Promise<string> {
        if (!urlString || !urlString.startsWith("https://")) {
            return Promise.reject(`L’URL doit commencer par "https://".`);
        }
        // Extraire la partie après "https://"
        const afterHttps = urlString.substring("https://".length);

        // Vérifier les mots interdits avec #blackList
        const blacklistError = this.#blackList(afterHttps);
        if (blacklistError) {
            return Promise.reject(blacklistError); // ex. "Le nom de domaine n'est pas autorisé."
        }
        return new Promise((resolve, reject) => {
            // Configurer un timeout de 2 secondes (2000 ms)
            const timeoutMs = 1000;

            const req = https.get(urlString, { timeout: timeoutMs }, (res) => {
                if (res.statusCode! >= 200 && res.statusCode! < 400) {
                    resolve(`L’URL est accessible.`);
                } else {
                    reject(`L’URL n’est pas accessible.`);
                }
            });

            // Gérer les erreurs réseau (ex. domaine inexistant)
            req.on("error", (err) => {
                reject(`L’URL n’est pas accessible.`);
            });

            // Gérer le timeout manuellement
            req.setTimeout(timeoutMs, () => {
                req.destroy();
                reject(`Il me semble que ce site n'existe pas.`);
            });
        });
    }
    #blackList(text: string): string | undefined {
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
        // Regex sans limite de mot à droite
        const regex = new RegExp(`\\b(${listeDomaine.join("|")})`, "i");

        if (regex.test(text)) {
            return "Le lien n'est pas autorisé.";
        }
    }

    // async #checkLink(link: string) {
    //     if (link.includes("https://") == false) {
    //         return "Le lien n'est pas au bon format.";
    //     }
    //     const parts = link.split("//");
    //     if (parts[0] != "https:") {
    //         return "Le lien n'est pas au bon format.";
    //     }

    //     const domainExtension = parts[1];
    //     const split = domainExtension.split(".");
    //     for (let i = 0; i < split.length - 1; i++) {
    //         const resBlack = await this.#blackList(split[i]);
    //         if (resBlack) {
    //             return resBlack;
    //         }
    //     }
    //     const reswhite = await this.#whiteList(split[split.length - 1]);
    //     if (reswhite) {
    //         return reswhite;
    //     }
    // }
}

export default new ModuleValidator();
