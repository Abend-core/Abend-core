/// <reference types="jest" />

import ModuleController, {
    moduleCreate,
    moduleUpdate,
} from "../../src/controllers/module";
import { Module, moduleCreationAttributes } from "../../src/models/module";
import Like from "../../src/models/liked";
import Visited from "../../src/models/visited";
import Reported from "../../src/models/reported";
import { User } from "../../src/models/user";
import Follow from "../../src/models/follow";
import Redis, { KEYS } from "../../src/tools/redis";
import UUID from "../../src/tools/uuid";
import fs from "fs";

// Mock des dépendances
jest.mock("../../src/models/module");
jest.mock("../../src/models/liked");
jest.mock("../../src/models/visited");
jest.mock("../../src/models/reported");
jest.mock("../../src/models/user");
jest.mock("../../src/models/follow");
jest.mock("../../src/tools/redis");
jest.mock("../../src/tools/uuid");
jest.mock("fs", () => ({
    promises: {
        unlink: jest.fn().mockResolvedValue(undefined),
    },
}));
jest.mock("config", () => ({
    get: jest.fn().mockReturnValue("mocked-value"), // Mock config.get
}));

describe("ModuleController", () => {
    const controller = ModuleController;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("add", () => {
        it("Doit créer un module avec les bonnes données", async () => {
            (UUID.v7 as jest.Mock).mockReturnValue("mocked-uuid");
            (Module.create as jest.Mock).mockResolvedValue({
                id: "mocked-uuid",
            });
            (Redis.deleteCache as jest.Mock).mockResolvedValue(undefined);

            const data: moduleCreate = {
                name: "module1",
                link: "https://example.com",
                tag1: "tech",
                tag2: "dev",
                tag3: "",
                image: "image.png",
                content: "",
                isShow: false,
                user_id: "",
            };
            const file: Express.Multer.File = { filename: "image.png" } as any;

            await controller.add(data, file);

            expect(Redis.deleteCache).toHaveBeenCalledWith(KEYS.modules);
            expect(UUID.v7).toHaveBeenCalled();
            expect(Module.create).toHaveBeenCalledWith({
                id: "mocked-uuid",
                name: "module1",
                link: "https://example.com",
                tags: "tech, dev",
                isShow: true,
                image: "image.png",
                user_id: "",
                content: "",
                tag1: "tech",
                tag2: "dev",
                tag3: "",
            });
        });
    });

    describe("update", () => {
        it("Doit mettre à jour un module existant", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue({
                id: "module-id",
            });
            (Module.update as jest.Mock).mockResolvedValue([1]);
            (Redis.deleteCache as jest.Mock).mockResolvedValue(undefined);

            const data: moduleUpdate = { name: "updated-module" };
            await controller.update("module-id", data);

            expect(Redis.deleteCache).toHaveBeenCalledWith(KEYS.modules);
            expect(Module.findByPk).toHaveBeenCalledWith("module-id");
            expect(Module.update).toHaveBeenCalledWith(data, {
                where: { id: "module-id" },
            });
        });

        it("Doit rejeter une erreur si le module n'existe pas", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(
                controller.update("module-id", { name: "updated" })
            ).rejects.toThrow("Bad request.");
        });
    });

    describe("getAll", () => {
        it("Doit retourner les modules depuis le cache", async () => {
            const cachedModules = [{ id: "1", name: "cached" }];
            (Redis.getCache as jest.Mock).mockResolvedValue(cachedModules);

            const result = await controller.getAll();

            expect(Redis.getCache).toHaveBeenCalledWith(KEYS.modules);
            expect(Module.findAll).not.toHaveBeenCalled();
            expect(result).toEqual(cachedModules);
        });

        it("Doit récupérer les modules depuis la DB si pas de cache", async () => {
            (Redis.getCache as jest.Mock).mockResolvedValue(null);
            (Module.findAll as jest.Mock).mockResolvedValue([
                {
                    id: "1",
                    name: "module1",
                    toJSON: () => ({ id: "1", name: "module1" }),
                },
            ]);
            (Like.findAll as jest.Mock).mockResolvedValue([
                { UserId: "user1" },
            ]);
            (Reported.findAll as jest.Mock).mockResolvedValue([]);
            (Visited.findAll as jest.Mock).mockResolvedValue([
                { UserId: "user1", Count: 5 },
            ]);
            (Redis.setCache as jest.Mock).mockResolvedValue(undefined);

            const result = await controller.getAll();

            expect(Redis.getCache).toHaveBeenCalledWith(KEYS.modules);
            expect(Module.findAll).toHaveBeenCalledWith({
                include: expect.anything(),
                order: [["createdAt", "DESC"]],
                nest: true,
            });
            expect(Redis.setCache).toHaveBeenCalledWith(
                KEYS.modules,
                expect.any(Array)
            );
            expect(result[0]).toHaveProperty("visiteCount", 5);
            expect(result[0]).toHaveProperty("favorisCount", 1);
            expect(result[0]).toHaveProperty("reportedCount", 0);
        });
    });

    describe("showAdmin", () => {
        it("Doit retourner les modules des admins", async () => {
            const mockModules = [
                { id: "1", User: { isAdmin: true }, name: "admin-module" },
                { id: "2", User: { isAdmin: false }, name: "user-module" },
            ];
            jest.spyOn(controller, "getAll").mockResolvedValue(mockModules);

            const result = await controller.showAdmin();

            expect(controller.getAll).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("admin-module");
        });
    });

    describe("getModule", () => {
        it("Doit retourner les modules d’un utilisateur", async () => {
            const mockModules = [
                {
                    id: "1",
                    user_id: "user1", // Nécessaire pour le filtre
                    favoris: { user1: true }, // Nécessaire pour isLike
                    reported: { user1: false }, // Nécessaire pour isReport
                    name: "module1", // Exemple de propriété supplémentaire
                    link: "https://example.com",
                },
                {
                    id: "2",
                    user_id: "user2", // Ne sera pas inclus car user_id différent
                    favoris: {},
                    reported: {},
                },
            ];
            jest.spyOn(controller, "getAll").mockResolvedValue(mockModules);

            const result = await controller.getModule("user1");

            expect(controller.getAll).toHaveBeenCalled();
            expect(result).toEqual([
                {
                    id: "1",
                    user_id: "user1",
                    favoris: { user1: true },
                    reported: { user1: false },
                    name: "module1",
                    link: "https://example.com",
                    isLike: true, // !!{ user1: true } -> true
                    isReport: false, // !!{ user1: false } -> false
                },
            ]);
        });
    });

    describe("show", () => {
        it("Doit retourner les modules visibles", async () => {
            const mockModules = [
                {
                    id: "1",
                    isShow: true,
                    favoris: { user1: true },
                    reported: {},
                },
                { id: "2", isShow: false, favoris: {}, reported: {} },
            ];
            jest.spyOn(controller, "getAll").mockResolvedValue(mockModules);

            const result = await controller.show("user1");

            expect(controller.getAll).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(
                expect.objectContaining({ isLike: true, isReport: false })
            );
        });
    });

    describe("hide", () => {
        it("Doit retourner les modules cachés", async () => {
            const mockModules = [
                { id: "1", isShow: true, favoris: {}, reported: {} },
                {
                    id: "2",
                    isShow: false,
                    favoris: { user1: true },
                    reported: {},
                },
            ];
            jest.spyOn(controller, "getAll").mockResolvedValue(mockModules);

            const result = await controller.hide("user1");

            expect(controller.getAll).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(
                expect.objectContaining({ isLike: true, isReport: false })
            );
        });
    });

    describe("toggleLike", () => {
        it("Doit ajouter un like si aucun existant", async () => {
            (Like.findOne as jest.Mock).mockResolvedValue(null);
            (Like.create as jest.Mock).mockResolvedValue({});
            (Module.increment as jest.Mock).mockResolvedValue([1]);

            await controller.toggleLike("user1", "module1");

            expect(Like.findOne).toHaveBeenCalledWith({
                where: { UserId: "user1", ModuleId: "module1" },
            });
            expect(Like.create).toHaveBeenCalledWith({
                UserId: "user1",
                ModuleId: "module1",
            });
            expect(Module.increment).toHaveBeenCalledWith("likes", {
                where: { id: "module1" },
            });
        });

        it("Doit supprimer un like si existant", async () => {
            (Like.findOne as jest.Mock).mockResolvedValue({
                UserId: "user1",
                ModuleId: "module1",
            });
            (Like.destroy as jest.Mock).mockResolvedValue(1);
            (Module.decrement as jest.Mock).mockResolvedValue([1]);

            await controller.toggleLike("user1", "module1");

            expect(Like.destroy).toHaveBeenCalledWith({
                where: { UserId: "user1", ModuleId: "module1" },
            });
            expect(Module.decrement).toHaveBeenCalledWith("likes", {
                where: { id: "module1" },
            });
        });
    });

    describe("toggleReport", () => {
        it("Doit ajouter un report et cacher si nécessaire", async () => {
            (Reported.findOne as jest.Mock).mockResolvedValue(null);
            (Reported.create as jest.Mock).mockResolvedValue({});
            (Reported.count as jest.Mock).mockResolvedValue(6);
            (Module.update as jest.Mock).mockResolvedValue([1]);

            await controller.toggleReport("user1", "module1");

            expect(Reported.findOne).toHaveBeenCalledWith({
                where: { UserId: "user1", ModuleId: "module1" },
            });
            expect(Reported.create).toHaveBeenCalledWith({
                UserId: "user1",
                ModuleId: "module1",
            });
            expect(Reported.count).toHaveBeenCalledWith({
                where: { ModuleId: "module1" },
            });
            expect(Module.update).toHaveBeenCalledWith(
                { isShow: false },
                { where: { id: "module1" } }
            );
        });
    });

    describe("toggleView", () => {
        it("Doit incrémenter une visite existante", async () => {
            (Visited.findOne as jest.Mock).mockResolvedValue({
                UserId: "user1",
                ModuleId: "module1",
                Count: 1,
            });
            (Visited.upsert as jest.Mock).mockResolvedValue([{}]);
            (Module.increment as jest.Mock).mockResolvedValue([1]);

            await controller.toggleView("user1", "module1");

            expect(Visited.findOne).toHaveBeenCalledWith({
                where: { UserId: "user1", ModuleId: "module1" },
                raw: true,
            });
            expect(Visited.upsert).toHaveBeenCalledWith({
                UserId: "user1",
                ModuleId: "module1",
                Count: 2,
            });
            expect(Module.increment).toHaveBeenCalledWith("views", {
                where: { id: "module1" },
            });
        });
    });

    describe("moduleLikeByUser", () => {
        it("Doit retourner les modules likés par l’utilisateur", async () => {
            const mockModules = [
                { id: "1", favoris: { user1: true }, reported: {} },
                { id: "2", favoris: {}, reported: {} },
            ];
            jest.spyOn(controller, "getAll").mockResolvedValue(mockModules);

            const result = await controller.moduleLikeByUser("user1");

            expect(controller.getAll).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(
                expect.objectContaining({ isLike: true, isReport: false })
            );
        });
    });

    describe("delete", () => {
        it("Doit supprimer un module et son fichier", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue({
                id: "module1",
                image: "image.png",
                get: () => ({ id: "module1", image: "image.png" }),
            });
            (Module.destroy as jest.Mock).mockResolvedValue(1);
            (fs.promises.unlink as jest.Mock).mockResolvedValue(undefined);
            (Redis.deleteCache as jest.Mock).mockResolvedValue(undefined);

            await controller.delete("module1");

            expect(Redis.deleteCache).toHaveBeenCalledWith(KEYS.modules);
            expect(Module.findByPk).toHaveBeenCalledWith("module1");
            expect(fs.promises.unlink).toHaveBeenCalledWith(
                "src/uploads/module/image.png"
            );
            expect(Module.destroy).toHaveBeenCalledWith({
                where: { id: "module1" },
            });
        });
    });

    describe("getReported", () => {
        it("Doit retourner les modules signalés", async () => {
            const mockModules = [
                { id: "1", reportedCount: 2 },
                { id: "2", reportedCount: 0 },
            ];
            jest.spyOn(controller, "getAll").mockResolvedValue(mockModules);

            const result = await controller.getReported();

            expect(controller.getAll).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe("1");
        });
    });
});
