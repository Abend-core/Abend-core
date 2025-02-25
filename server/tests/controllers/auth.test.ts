/// <reference types="jest" />

import AuthController from "../../src/controllers/auth";
import { User, userCreationAttributes } from "../../src/models/user";
import Crypt from "../../src/tools/hash";
import UUID from "../../src/tools/uuid";
import jwt from "jsonwebtoken";
import Mail from "../../src/tools/email";
import config from "config";

// Mock des dépendances
jest.mock("../../src/models/user");
jest.mock("../../src/tools/hash");
jest.mock("../../src/tools/uuid");
jest.mock("jsonwebtoken");
jest.mock("../../src/tools/email");
jest.mock("config");

describe("AuthController", () => {
    const controller = AuthController;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("register", () => {
        it("Doit créer un utilisateur avec les bonnes données", async () => {
            (UUID.v7 as jest.Mock).mockReturnValue("mocked-uuid");
            (Crypt.genToken as jest.Mock).mockReturnValue("mocked-token");
            (Crypt.hash as jest.Mock).mockResolvedValue("hashed-password");
            (User.create as jest.Mock).mockResolvedValue({
                id: "mocked-uuid",
                mail: "test@example.com",
                password: "password123",
            });
            (User.update as jest.Mock).mockResolvedValue([1]);
            (Mail.verification as jest.Mock).mockResolvedValue(undefined);
            (config.get as jest.Mock).mockReturnValue(5); // imageCount

            const userData = {
                mail: "test@example.com",
                password: "password123",
                username: "testuser",
            };

            await controller.register(userData);

            expect(UUID.v7).toHaveBeenCalled();
            expect(Crypt.genToken).toHaveBeenCalledWith(12);
            expect(User.create).toHaveBeenCalledWith({
                id: "mocked-uuid",
                mail: "test@example.com",
                username: "testuser",
                password: "password123",
                isAdmin: false,
                isActive: false,
                token: "mocked-token",
                image: "bank-img-NaN.png",
            });
            expect(Crypt.hash).toHaveBeenCalledWith("password123");
            expect(User.update).toHaveBeenCalledWith(
                { password: "hashed-password" },
                { where: { id: "mocked-uuid" }, validate: false }
            );
            expect(Mail.verification).toHaveBeenCalledWith(
                "test@example.com",
                "mocked-token"
            );
        });
    });

    describe("signin", () => {
        it("Doit retourner UUID et token pour un utilisateur valide", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "user-id",
                mail: "test@example.com",
            });
            (jwt.sign as jest.Mock).mockReturnValue("jwt-token");

            const result = await controller.signin({
                mail: "test@example.com",
                password: "password123",
            });

            expect(User.findOne).toHaveBeenCalledWith({
                where: { mail: "test@example.com" },
            });
            expect(jwt.sign).toHaveBeenCalledWith(
                { userId: "user-id" },
                expect.anything(), // privateKey
                { expiresIn: "1h" }
            );
            expect(result).toEqual({
                UUID: "user-id",
                token: "jwt-token",
            });
        });
    });

    describe("validation", () => {
        it("Doit activer un utilisateur et vider son token", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "user-id",
                token: "valid-token",
            });
            (User.update as jest.Mock).mockResolvedValue([1]);

            await controller.validation("valid-token");

            expect(User.findOne).toHaveBeenCalledWith({
                where: { token: "valid-token" },
            });
            expect(User.update).toHaveBeenCalledWith(
                { isActive: true, token: "" },
                { where: { id: "user-id" } }
            );
        });
    });

    describe("forgot", () => {
        it("Doit générer un token et envoyer un email", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "user-id",
                mail: "test@example.com",
            });
            (Crypt.genToken as jest.Mock).mockReturnValue("reset-token");
            (User.update as jest.Mock).mockResolvedValue([1]);
            (Mail.updatePassword as jest.Mock).mockResolvedValue(undefined);

            await controller.forgot("test@example.com");

            expect(User.findOne).toHaveBeenCalledWith({
                where: { mail: "test@example.com" },
            });
            expect(Crypt.genToken).toHaveBeenCalledWith(12);
            expect(User.update).toHaveBeenCalledWith(
                { token: "reset-token" },
                { where: { id: "user-id" } }
            );
            expect(Mail.updatePassword).toHaveBeenCalledWith(
                "test@example.com",
                "reset-token"
            );
        });
    });

    describe("updatepassword", () => {
        it("Doit mettre à jour le mot de passe et vider le token", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "user-id",
                token: "reset-token",
            });
            (Crypt.hash as jest.Mock).mockResolvedValue("hashed-new-password");
            (User.update as jest.Mock).mockResolvedValue([1]);

            await controller.updatepassword({
                token: "reset-token",
                newPassword: "newpass123",
                confirmPassword: "newpass123",
            });

            expect(User.findOne).toHaveBeenCalledWith({
                where: { token: "reset-token" },
            });
            expect(Crypt.hash).toHaveBeenCalledWith("newpass123");
            expect(User.update).toHaveBeenCalledWith(
                { token: "", password: "hashed-new-password" },
                { where: { id: "user-id" } }
            );
        });
    });
});
