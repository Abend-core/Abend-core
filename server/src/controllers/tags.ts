//Modele & bdd
import Tag from "../models/tag";

class TagsController {
    async add(tags: string) {
        const tag = tags.split("#");
        for (let i = 1; i < tag.length; i++) {
            const found = Tag.findOne({ where: { name: tag[i] } });
            if (!found) {
                Tag.create({ name: tag[i], uses: 1 });
            } else {
                Tag.increment("uses", { where: { name: tag[i] } });
            }
        }
    }

    async getTags() {
        const tags = Tag.findAll();
        return tags;
    }
}

export default new TagsController();
