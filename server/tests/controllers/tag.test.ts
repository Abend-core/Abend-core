/// <reference types="jest" />

import TagsController, { moduleCreate } from "../../src/controllers/tags";
import Tag from "../../src/models/tag";
import { Module } from "../../src/models/module";

// Mock des dépendances
jest.mock("../../src/models/tag");
jest.mock("../../src/models/module");

describe("TagsController", () => {
    const controller = TagsController;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("add", () => {
        it("Doit créer un nouveau tag s'il n'existe pas", async () => {
            (Tag.findOne as jest.Mock).mockResolvedValue(null);
            (Tag.create as jest.Mock).mockResolvedValue({
                name: "tech",
                uses: 1,
            });

            const data: moduleCreate = {
                tag1: "tech",
                tag2: "",
                tag3: "",
                name: "module1",
                link: "https://example.com",
                image: "",
                content: "",
                isShow: true,
                user_id: "",
            };

            await controller.add(data);

            expect(Tag.findOne).toHaveBeenCalledWith({
                where: { name: "tech" },
            });
            expect(Tag.create).toHaveBeenCalledWith({ name: "tech", uses: 1 });
            expect(Tag.increment).not.toHaveBeenCalled();
        });

        it("Doit incrémenter un tag existant", async () => {
            (Tag.findOne as jest.Mock).mockResolvedValue({
                name: "tech",
                uses: 1,
            });
            (Tag.increment as jest.Mock).mockResolvedValue([1]);

            const data: moduleCreate = {
                tag1: "tech",
                tag2: "",
                tag3: "",
                name: "module1",
                link: "https://example.com",
                image: "",
                content: "",
                isShow: true,
                user_id: "",
            };

            await controller.add(data);

            expect(Tag.findOne).toHaveBeenCalledWith({
                where: { name: "tech" },
            });
            expect(Tag.increment).toHaveBeenCalledWith("uses", {
                where: { name: "tech" },
            });
            expect(Tag.create).not.toHaveBeenCalled();
        });

        it("Doit ignorer les tags vides", async () => {
            (Tag.findOne as jest.Mock).mockResolvedValue(null);
            (Tag.create as jest.Mock).mockResolvedValue({
                name: "tech",
                uses: 1,
            });

            const data: moduleCreate = {
                tag1: "tech",
                tag2: "",
                tag3: "",
                name: "module1",
                link: "https://example.com",
                image: "",
                content: "",
                isShow: true,
                user_id: "",
            };

            await controller.add(data);

            expect(Tag.findOne).toHaveBeenCalledTimes(1);
            expect(Tag.findOne).toHaveBeenCalledWith({
                where: { name: "tech" },
            });
            expect(Tag.create).toHaveBeenCalledWith({ name: "tech", uses: 1 });
        });
    });

    describe("getTags", () => {
        it("Doit retourner tous les tags", async () => {
            const mockTags = [
                { name: "tech", uses: 5 },
                { name: "dev", uses: 3 },
            ];
            (Tag.findAll as jest.Mock).mockResolvedValue(mockTags);

            const result = await controller.getTags();

            expect(Tag.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockTags);
        });

        it("Doit retourner une liste vide si aucun tag", async () => {
            (Tag.findAll as jest.Mock).mockResolvedValue([]);

            const result = await controller.getTags();

            expect(Tag.findAll).toHaveBeenCalled();
            expect(result).toEqual([]);
        });
    });

    describe("delete", () => {
        it("Doit supprimer un tag avec uses=1", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue({
                id: "module-id",
                tags: "tech, dev",
            });
            (Tag.findOne as jest.Mock)
                .mockResolvedValueOnce({ name: "tech", uses: 1 })
                .mockResolvedValueOnce({ name: "dev", uses: 2 });
            (Tag.destroy as jest.Mock).mockResolvedValue(1);
            (Tag.decrement as jest.Mock).mockResolvedValue([1]);

            await controller.delete("module-id");

            expect(Module.findByPk).toHaveBeenCalledWith("module-id");
            expect(Tag.findOne).toHaveBeenCalledWith({
                where: { name: "tech" },
            });
            expect(Tag.findOne).toHaveBeenCalledWith({
                where: { name: "dev" },
            });
            expect(Tag.destroy).toHaveBeenCalledWith({
                where: { name: "tech" },
            });
            expect(Tag.decrement).toHaveBeenCalledWith("uses", {
                where: { name: "dev" },
            });
        });

        it("Doit décrémenter un tag avec uses>1", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue({
                id: "module-id",
                tags: "tech",
            });
            (Tag.findOne as jest.Mock).mockResolvedValue({
                name: "tech",
                uses: 2,
            });
            (Tag.decrement as jest.Mock).mockResolvedValue([1]);

            await controller.delete("module-id");

            expect(Module.findByPk).toHaveBeenCalledWith("module-id");
            expect(Tag.findOne).toHaveBeenCalledWith({
                where: { name: "tech" },
            });
            expect(Tag.decrement).toHaveBeenCalledWith("uses", {
                where: { name: "tech" },
            });
            expect(Tag.destroy).not.toHaveBeenCalled();
        });

        it("Ne doit rien faire si le module n’a pas de tags", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue({
                id: "module-id",
                tags: "",
            });

            await controller.delete("module-id");

            expect(Module.findByPk).toHaveBeenCalledWith("module-id");
            expect(Tag.findOne).not.toHaveBeenCalled();
            expect(Tag.destroy).not.toHaveBeenCalled();
            expect(Tag.decrement).not.toHaveBeenCalled();
        });

        it("Ne doit rien faire si le module n’existe pas", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue(null);

            await controller.delete("module-id");

            expect(Module.findByPk).toHaveBeenCalledWith("module-id");
            expect(Tag.findOne).not.toHaveBeenCalled();
            expect(Tag.destroy).not.toHaveBeenCalled();
            expect(Tag.decrement).not.toHaveBeenCalled();
        });
    });
});
