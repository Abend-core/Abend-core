//Modele & bdd
import Tag from "../models/tag";
import { moduleCreationAttributes } from "../models/module";

interface moduleCreate extends moduleCreationAttributes {
    tag1: string;
    tag2: string;
    tag3: string;
}
class TagsController {
    async add(data: moduleCreate) {
        const tabTags = [data.tag1 ?? "", data.tag2 ?? "", data.tag3 ?? ""];

        for (let i = 0; i < tabTags.length; i++) {
            if (!tabTags[i]) continue;
            const found = await Tag.findOne({ where: { name: tabTags[i] } });

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
}

export default new TagsController();
