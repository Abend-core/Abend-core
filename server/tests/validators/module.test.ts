/// <reference types="jest" />

import moduleValidator from "../../src/validators/module";
import { User } from "../../src/models/user";
import { Module } from "../../src/models/module";

// Mock des dépendances
jest.mock("../../src/models/user");
jest.mock("../../src/models/module");

describe("ModuleValidator", () => {
    const validator = moduleValidator;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("data", () => {
        it("Doit retourner si un tag est interdit", async () => {
            (Module.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.data({
                name: "module1",
                link: "https://example.com",
                tag1: "porn",
                tag2: "tech",
                tag3: "dev",
            });
            expect(result).toBe("Ce tag n'est pas autorisé.");
        });

        it("Doit retourner si un tag est trop long", async () => {
            (Module.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.data({
                name: "module1",
                link: "https://example.com",
                tag1: "toolong",
                tag2: "tech",
                tag3: "dev",
            });
            expect(result).toBe("Un tag peut contenir 5 caractères maximum.");
        });

        it("Doit retourner si le nom est déjà pris", async () => {
            (Module.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                name: "module1",
            });
            const result = await validator.data({
                name: "module1",
                link: "https://example.com",
                tag1: "tech",
                tag2: "dev",
                tag3: "js",
            });
            expect(result).toBe("Ce nom de module est déjà pris.");
        });

        it("Doit retourner si le lien n'a pas https", async () => {
            (Module.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.data({
                name: "module1",
                link: "http://example.com",
                tag1: "tech",
                tag2: "dev",
                tag3: "js",
            });
            expect(result).toBe("Le lien n'est pas au bon format.");
        });

        it("Doit retourner si le domaine est blacklisté", async () => {
            (Module.findOne as jest.Mock).mockResolvedValue(null); // #findName
            const result = await validator.data({
                name: "module1",
                link: "https://casino.com",
                tag1: "tech",
                tag2: "dev",
                tag3: "js",
            });
            expect(result).toBe("Le nom de domaine n'est pas autorisé.");
        });

        it("Doit retourner si l'extension n'est pas whitelistée", async () => {
            (Module.findOne as jest.Mock).mockResolvedValue(null); // #findName
            const result = await validator.data({
                name: "module1",
                link: "https://example.xyzzy",
                tag1: "tech",
                tag2: "dev",
                tag3: "js",
            });
            expect(result).toBe("Cette extension n'est pas accepter.");
        });

        it("Doit retourner undefined si tout est valide", async () => {
            (Module.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.data({
                name: "module1",
                link: "https://example.com",
                tag1: "tech",
                tag2: "dev",
                tag3: "js",
            });
            expect(result).toBeUndefined();
        });
    });

    describe("foundUser", () => {
        it("Doit retourner un utilisateur si trouvé", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({
                id: "1",
                username: "john",
            });
            const result = await validator.foundUser("1");
            expect(result).toEqual({ id: "1", username: "john" });
        });

        it("Doit retourner null si utilisateur non trouvé", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);
            const result = await validator.foundUser("1");
            expect(result).toBeNull();
        });
    });

    describe("foundUserByUsername", () => {
        it("Doit retourner un utilisateur si trouvé par username", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                username: "john",
            });
            const result = await validator.foundUserByUsername("john");
            expect(result).toEqual({ id: "1", username: "john" });
        });

        it("Doit retourner null si utilisateur non trouvé", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.foundUserByUsername("john");
            expect(result).toBeNull();
        });
    });

    describe("foundModule", () => {
        it("Doit retourner un module si trouvé", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue({
                id: "1",
                name: "module1",
            });
            const result = await validator.foundModule("1");
            expect(result).toEqual({ id: "1", name: "module1" });
        });

        it("Doit retourner null si module non trouvé", async () => {
            (Module.findByPk as jest.Mock).mockResolvedValue(null);
            const result = await validator.foundModule("1");
            expect(result).toBeNull();
        });
    });

    describe("hasFile", () => {
        it("Doit retourner une erreur si aucun fichier", async () => {
            const result = await validator.hasFile(undefined as any); // Corriger le type dans le validateur
            expect(result).toBe("Aucun fichier téléchargé.");
        });

        it("Doit retourner undefined si fichier présent", async () => {
            const file = { fieldname: "file" } as Express.Multer.File;
            const result = await validator.hasFile(file);
            expect(result).toBeUndefined();
        });
    });
});
