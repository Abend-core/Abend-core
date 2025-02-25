/// <reference types="jest" />

import authValidator from "../../src/validators/auth";
import { User } from "../../src/models/user";
import Crypt from "../../src/tools/hash";

// Mock des dépendances
jest.mock("../../src/models/user");
jest.mock("../../src/tools/hash");

describe("AuthValidator", () => {
    const validator = authValidator;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("register", () => {
        it("Doit retourner si l'identifiant est déjà pris", async () => {
            (User.findOne as jest.Mock)
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce({ id: "1", username: "john" });
            const result = await validator.register({
                username: "john",
                mail: "john@example.com",
                password: "password123",
            });
            expect(result).toBe("Cet identifiant est déjà utilisé.");
        });

        it("Doit retourner si le mot de passe est trop court", async () => {
            (User.findOne as jest.Mock)
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce(null);
            const result = await validator.register({
                username: "john",
                mail: "john@example.com",
                password: "short",
            });
            expect(result).toBe(
                "Le mot de passe doit contenir plus de 8 caractères."
            );
        });

        it("Doit retourner si l'email est déjà pris", async () => {
            (User.findOne as jest.Mock)
                .mockResolvedValueOnce({
                    id: "1",
                    mail: "john@example.com",
                })
                .mockResolvedValueOnce(null);
            const result = await validator.register({
                username: "john",
                mail: "john@example.com",
                password: "password123",
            });
            expect(result).toBe(
                "Ce mail est déjà utilisé par un autre compte."
            );
        });

        it("Doit retourner undefined si tout est valide", async () => {
            (User.findOne as jest.Mock)
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce(null);
            const result = await validator.register({
                username: "john",
                mail: "john@example.com",
                password: "password123",
            });
            expect(result).toBeUndefined();
        });
    });
    describe("signin", () => {
        it("Doit retourner si mail est inconnu", async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce(null);
            const result = await validator.signin({
                mail: "mauvais@mail.com",
                password: "password123",
            });
            expect(result).toBe("Identifiant ou mot de passe incorrect.");
        });

        it("Doit retourner si password est invalide", async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce({
                id: "1",
                username: "john",
            });
            (Crypt.compare as jest.Mock).mockResolvedValueOnce(null);
            const result = await validator.signin({
                mail: "bon@mail.com",
                password: "mauvaismdp",
            });
            expect(result).toBe("Identifiant ou mot de passe incorrect.");
        });

        it("Doit retourner si password est trop court", async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce({
                id: "1",
                username: "john",
            });
            (Crypt.compare as jest.Mock).mockResolvedValueOnce(null);
            const result = await validator.signin({
                mail: "bon@mail.com",
                password: "passwo",
            });
            expect(result).toBe("Identifiant ou mot de passe incorrect.");
        });

        it("Doit retourner si le mail n'est pas vérifié", async () => {
            (User.findOne as jest.Mock)
                .mockResolvedValueOnce({ id: "1", password: "hashedpass" })
                .mockResolvedValueOnce({ id: "1", isActive: false });
            (Crypt.compare as jest.Mock).mockResolvedValue(true);
            const result = await validator.signin({
                mail: "bon@mail.com",
                password: "password1",
            });
            expect(result).toBe("L'adresse mail n'a pas été vérifié.");
        });

        it("Doit retourner undefined si tout est correcte", async () => {
            (User.findOne as jest.Mock)
                .mockResolvedValueOnce({ id: "1", password: "hashedpass" })
                .mockResolvedValueOnce({ id: "1", isActive: true });
            (Crypt.compare as jest.Mock).mockResolvedValue(true);
            const result = await validator.signin({
                mail: "bon@mail.com",
                password: "password1",
            });
            expect(result).toBeUndefined();
        });
    });
    describe("validation", () => {
        it("Doit retourner si le token est invalide", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.validation("invalid-token");
            expect(result).toBe("Mauvais token.");
        });

        it("Doit retourner undefined si le token est valide", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                token: "valid-token",
            });
            const result = await validator.validation("valid-token");
            expect(result).toBeUndefined();
        });
    });

    describe("forgot", () => {
        it("Doit retourner si le mail n'existe pas", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.forgot("unknown@example.com");
            expect(result).toBe("Ce mail n'existe pas.");
        });

        it("Doit retourner undefined si le mail existe", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                mail: "john@example.com",
            });
            const result = await validator.forgot("john@example.com");
            expect(result).toBeUndefined();
        });
    });

    describe("updatepassword", () => {
        it("Doit retourner si le token n'est pas valide", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            const result = await validator.updatepassword({
                token: "invalid-token",
                newPassword: "newpass123",
                confirmPassword: "newpass123",
            });
            expect(result).toBe("Ce token n'est pas valide.");
        });

        it("Doit retourner si le mot de passe est trop court", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                password: "hashedpass",
            });
            const result = await validator.updatepassword({
                token: "valid-token",
                newPassword: "short",
                confirmPassword: "short",
            });
            expect(result).toBe(
                "Le mot de passe doit contenir plus de 8 caractères."
            );
        });

        it("Doit retourner si les mots de passe ne sont pas identiques", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                password: "hashedpass",
            });
            const result = await validator.updatepassword({
                token: "valid-token",
                newPassword: "newpass123",
                confirmPassword: "newpass124",
            });
            expect(result).toBe("Les mots de passe ne sont pas identiques.");
        });

        it("Doit retourner si le nouveau mot de passe est identique à l'ancien", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                password: "hashedpass",
            });
            (Crypt.compare as jest.Mock).mockResolvedValue(true);
            const result = await validator.updatepassword({
                token: "valid-token",
                newPassword: "newpass123",
                confirmPassword: "newpass123",
            });
            expect(result).toBe(
                "Ce mot de passe est utilisé, merci d'utiliser un nouveau mot de passe."
            );
        });

        it("Doit retourner undefined si tout est valide", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "1",
                password: "hashedpass",
            });
            (Crypt.compare as jest.Mock).mockResolvedValue(false);
            const result = await validator.updatepassword({
                token: "valid-token",
                newPassword: "newpass123",
                confirmPassword: "newpass123",
            });
            expect(result).toBeUndefined();
        });
    });
});
