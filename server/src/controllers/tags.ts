//Modele & bdd
import Tag from "../models/tag";

class TagsController {
    async add(tags: string) {
        for (let i = 0; i < tags.length; i++) {
            const found = Tag.findOne({ where: { name: tags[i] } });
            if (!found) {
                Tag.create({ name: tags[i], uses: 1 });
            } else {
                Tag.increment("uses", { where: { name: tags[i] } });
            }
        }
    }

    async getTags() {
        const tags = Tag.findAll();
        return tags;
    }
}

export default new TagsController();
