/// <reference types="jest" />

import AbendController from "../../src/controllers/abend";
import { User } from "../../src/models/user";
import Visited from "../../src/models/visited";
import { Module } from "../../src/models/module";
import moduleController from "../../src/controllers/module";

// Mock des dépendances
jest.mock("../../src/models/user");
jest.mock("../../src/models/visited");
jest.mock("../../src/models/module");
jest.mock("../../src/controllers/module");

describe("AbendController", () => {
    const controller = AbendController;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("statistique", () => {
        it("Doit retourner les statistiques correctes", async () => {
            (Module.count as jest.Mock).mockResolvedValue(5);
            (User.count as jest.Mock).mockResolvedValue(10);
            (Visited.findAll as jest.Mock).mockResolvedValue([
                { totalCount: 100 },
            ]);

            const result = await controller.statistique();
            expect(result).toEqual({
                nbModule: 5,
                nbUser: 10,
                nbVisite: 100,
            });
        });

        it("Doit retourner 0 visites si aucune donnée", async () => {
            (Module.count as jest.Mock).mockResolvedValue(5);
            (User.count as jest.Mock).mockResolvedValue(10);
            (Visited.findAll as jest.Mock).mockResolvedValue([
                { totalCount: null },
            ]);

            const result = await controller.statistique();
            expect(result).toEqual({
                nbModule: 5,
                nbUser: 10,
                nbVisite: 0,
            });
        });

        it("Doit rejeter une erreur si Module.count échoue", async () => {
            (Module.count as jest.Mock).mockRejectedValue(
                new Error("Erreur DB")
            );
            await expect(controller.statistique()).rejects.toThrow("Erreur DB");
        });
    });

    describe("visite", () => {
        it("Doit retourner les 3 modules les plus visités", async () => {
            const mockModules = [
                { id: "1", name: "module1", visiteCount: 50 },
                { id: "2", name: "module2", visiteCount: 100 },
                { id: "3", name: "module3", visiteCount: 20 },
                { id: "4", name: "module4", visiteCount: 75 },
            ];
            (moduleController.getAll as jest.Mock).mockResolvedValue(
                mockModules
            );

            const result = await controller.visite();
            expect(result).toEqual([
                { id: "2", name: "module2", visiteCount: 100 },
                { id: "4", name: "module4", visiteCount: 75 },
                { id: "1", name: "module1", visiteCount: 50 },
            ]);
        });

        it("Doit retourner une liste vide si aucun module", async () => {
            (moduleController.getAll as jest.Mock).mockResolvedValue([]);

            const result = await controller.visite();
            expect(result).toEqual([]);
        });

        it("Doit retourner moins de 3 modules si la liste est courte", async () => {
            const mockModules = [
                { id: "1", name: "module1", visiteCount: 50 },
                { id: "2", name: "module2", visiteCount: 20 },
            ];
            (moduleController.getAll as jest.Mock).mockResolvedValue(
                mockModules
            );

            const result = await controller.visite();
            expect(result).toEqual([
                { id: "1", name: "module1", visiteCount: 50 },
                { id: "2", name: "module2", visiteCount: 20 },
            ]);
        });

        it("Doit rejeter une erreur si moduleController.getAll échoue", async () => {
            (moduleController.getAll as jest.Mock).mockRejectedValue(
                new Error("Erreur récupération modules")
            );
            await expect(controller.visite()).rejects.toThrow(
                "Erreur récupération modules"
            );
        });
    });
});
