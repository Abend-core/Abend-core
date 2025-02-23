//Modele & bdd
import { User } from "../models/user";
import Visited from "../models/visited";
import { Module } from "../models/module";
import sequelize from "sequelize";
import moduleController from "../controllers/module";

class AbendController {
    async statistique() {
        const [nbModule, nbUser, nbVisite] = await Promise.all([
            this.#getModule(),
            this.#getUser(),
            this.#getVisite(),
        ]);
        return { nbModule, nbUser, nbVisite };
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
        return res[0].totalCount || 0;
    }

    async visite() {
        const modules = await moduleController.getAll();
        const mostVisite = modules
            .sort((a: Module, b: Module) => b.visiteCount - a.visiteCount)
            .slice(0, 3);

        return mostVisite;
    }
}

export default new AbendController();
