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
            const tagsError = await this.#checkTags(
                moduleData.tag1 ?? "",
                moduleData.tag2 ?? "",
                moduleData.tag3 ?? ""
            );
            if (tagsError) {
                return tagsError;
            }

            if (moduleData.name) {
                const existingModule = await this.#findName(moduleData.name);
                if (existingModule) {
                    return "Ce nom de module est déjà pris.";
                }
            }

            if (moduleData.link) {
                await this.checkUrlValidity(moduleData.link);
            }

            return undefined;
        } catch (error) {
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

    checkUrlValidity(urlString: string): Promise<string> {
        if (!urlString || !urlString.startsWith("https://")) {
            return Promise.reject(`L’URL doit commencer par "https://".`);
        }

        const afterHttps = urlString.substring("https://".length);

        const blacklistError = this.#blackList(afterHttps);
        if (blacklistError) {
            return Promise.reject(blacklistError);
        }
        return new Promise((resolve, reject) => {
            const timeoutMs = 1000;

            const req = https.get(urlString, { timeout: timeoutMs }, (res) => {
                if (res.statusCode! >= 200 && res.statusCode! < 400) {
                    resolve(`L’URL est accessible.`);
                } else {
                    reject(`L’URL n’est pas accessible.`);
                }
            });

            req.on("error", (err) => {
                reject(`L’URL n’est pas accessible.`);
            });

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

        const regex = new RegExp(`\\b(${listeDomaine.join("|")})`, "i");

        if (regex.test(text)) {
            return "Le lien n'est pas autorisé.";
        }
    }
}

export default new ModuleValidator();
