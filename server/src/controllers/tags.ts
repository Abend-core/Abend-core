//Modele & bdd
import Tag from "../models/tag";
import { Module, moduleCreationAttributes } from "../models/module";

export interface moduleCreate extends moduleCreationAttributes {
    tag1: string;
    tag2: string;
    tag3: string;
}
class TagsController {
    async add(data: moduleCreate) {
        const tabTags = [data.tag1 ?? "", data.tag2 ?? "", data.tag3 ?? ""];

        for (let i = 0; i < tabTags.length; i++) {
            if (!tabTags[i]) continue;
            const found = await Tag.findOne({
                where: { name: tabTags[i].toLowerCase() },
            });

            if (!found) {
                Tag.create({ name: tabTags[i], uses: 1 });
            } else {
                Tag.increment("uses", { where: { name: tabTags[i] } });
            }
        }
    }

    async getTags() {
        const tags = await Tag.findAll();
        return tags;
    }

    async delete(idModule: string) {
        const module = await Module.findByPk(idModule);
        if (!module?.tags) {
            return;
        }
        const Tags = module?.tags.split(", ");

        for (let i = 0; i < Tags!.length; i++) {
            const tag = await Tag.findOne({ where: { name: Tags![i] } });
            if (tag?.uses === 1) {
                Tag.destroy({ where: { name: Tags![i] } });
            } else {
                Tag.decrement("uses", { where: { name: Tags![i] } });
            }
        }
    }
}

export default new TagsController();
