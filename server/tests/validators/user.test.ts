/// <reference types="jest" />

import userValidator from "../../src/validators/user";
import { User } from "../../src/models/user";
import Crypt from "../../src/tools/hash";

// Mock des dépendances
jest.mock("../../src/models/user");
jest.mock("../../src/tools/hash");

describe("UserValidator", () => {
    const validator = userValidator;

    beforeEach(() => {
        jest.clearAllMocks();
        (User.findByPk as jest.Mock).mockResolvedValue({
            password: "hashedpass",
        });
    });

    describe("data", () => {
        it("Doit retourner si l'identifiant est déjà pris", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ id: "1" });
            const result = await validator.data({
                username: "john",
                mail: "john@example.com",
            });
            expect(result).toBe("Cet identifiant est déjà utilisé.");
        });

        it("Doit retourner si l'identifiant est trop court", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.data({
                username: "ab",
                mail: "john@example.com",
            });
            expect(result).toBe(
                "L'identifiant doit faire entre 3 et 15 caractères."
            );
        });

        it("Doit retourner si la valeur est invalide", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.data({
                username: "john",
                mail: "john@example.com",
            });
            expect(result).toBeUndefined();
        });
    });

    describe("password", () => {
        it("Doit retourner si le mot de passe est trop court", async () => {
            const data = {
                password: "oldpass",
                newPassword: "short",
                confirmPassword: "short",
            };
            const result = await validator.password(data, "1");
            expect(result).toBe(
                "Le mot de passe doit contenir plus de 8 caractères."
            );
        });

        it("Doit retourner si les mot de passe ne sont pas identiques", async () => {
            const data = {
                password: "oldpass",
                newPassword: "newpass123",
                confirmPassword: "newpass124",
            };
            const result = await validator.password(data, "1");
            expect(result).toBe("Les mots de passe ne sont pas identiques.");
        });

        it("Doit retourner si les mot de passe sont invalide", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({
                password: "hashedpass",
            });
            (Crypt.compare as jest.Mock).mockResolvedValue(true);
            const data = {
                password: "oldpass",
                newPassword: "newpass123",
                confirmPassword: "newpass123",
            };
            const result = await validator.password(data, "1");
            expect(result).toBeUndefined();
        });
    });

    describe("found", () => {
        it("Doit retourner un utilisateur si trouvé", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({
                id: "1",
                username: "john",
            });
            const result = await validator.found("1");
            expect(result).toEqual({ id: "1", username: "john" });
        });

        it("Doit retourner null si utilisateur non trouvé", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);
            const result = await validator.found("1");
            expect(result).toBeNull();
        });
    });
});
