//Modele & bdd
import Tag from "../models/tag";
import { moduleCreationAttributes } from "../models/module";

interface moduleCreate extends moduleCreationAttributes {
    tags1: string;
    tags2: string;
    tags3: string;
}
class TagsController {
    async add(data: moduleCreate) {
        console.log("J'execute le add");
        console.log("📌 Le data :", data.tags);
        const tabTags = [data.tags1 ?? "", data.tags2 ?? "", data.tags3 ?? ""];
        console.log("📌 Tags à traiter :", tabTags);

        for (let i = 0; i < tabTags.length; i++) {
            if (!tabTags[i]) continue;
            console.log("JE SUIS LA !");
            const found = await Tag.findOne({ where: { name: tabTags[i] } });

            if (!found) {
                console.log("je creer le tag!");
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
