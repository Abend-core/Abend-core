//Tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
import config from "config";

//Modele & bdd
import { User, userCreationAttributes } from "../models/user";
import Visited from "../models/visited";
import { Module } from "../models/module";
import Mail from "../tools/email";
import sequelize from "sequelize/types/sequelize";

class AbendController {
    async statistique() {
        const [nbModule, nbUser, nbVisite] = await Promise.all([
            this.#getModule(),
            this.#getUser(),
            this.#getVisite(),
        ]);
        return { nbModule, nbUser, nbVisite }; // Optionnel : retourner les résultats
    }

    async #getModule() {
        const res = await Module.count();
        return res;
    }

    async #getUser() {
        const res = await User.count();
        return res;
    }

    async #getVisite() {
        const res = await Visited.findAll({
            attributes: [
                [sequelize.fn("SUM", sequelize.col("Count")), "totalCount"],
            ],
            raw: true,
        });
        return res[0].totalCount || 0; // Retourne 0 si aucune ligne
    }
}

export default new AbendController();
