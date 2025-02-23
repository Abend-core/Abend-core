/// <reference types="jest" />

import UserController, {
    passObj,
    TestUser,
    UserWithoutSensitiveData,
} from "../../src/controllers/user";
import { User, userCreationAttributes } from "../../src/models/user";
import { Module } from "../../src/models/module";
import Follow from "../../src/models/follow";
import Crypt from "../../src/tools/hash";
import UUID from "../../src/tools/uuid";
import Redis, { KEYS } from "../../src/tools/redis";
import fs from "fs";
import config from "config";
import { Op } from "sequelize";

// Mock des dépendances
jest.mock("../../src/models/user");
jest.mock("../../src/models/module");
jest.mock("../../src/models/follow");
jest.mock("../../src/tools/hash");
jest.mock("../../src/tools/uuid");
jest.mock("../../src/tools/redis");
jest.mock("fs", () => ({
    promises: {
        unlink: jest.fn().mockResolvedValue(undefined),
    },
}));
jest.mock("config", () => ({
    get: jest.fn().mockReturnValue(5), // Mock pour nombreImageBanque
}));

describe("UserController", () => {
    const controller = UserController;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("add", () => {
        it("Doit créer un utilisateur avec les bonnes données", async () => {
            (UUID.v7 as jest.Mock).mockReturnValue("mocked-uuid");
            (Crypt.hash as jest.Mock).mockResolvedValue("hashed-password");
            (User.create as jest.Mock).mockResolvedValue({
                id: "mocked-uuid",
                username: "testuser",
                mail: "test@example.com",
                password: "hashed-password",
            });
            (User.update as jest.Mock).mockResolvedValue([1]);

            const userData: userCreationAttributes = {
                username: "testuser",
                mail: "test@example.com",
            };

            await controller.add(userData);

            expect(UUID.v7).toHaveBeenCalled();
            expect(Crypt.hash).toHaveBeenCalledWith("password1");
            expect(User.create).toHaveBeenCalledWith({
                id: "mocked-uuid",
                username: "testuser",
                mail: "test@example.com",
                password: "hashed-password",
                image: expect.stringMatching(/^bank-img-[0-4]\.png$/),
                isActive: true,
            });
            expect(User.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "mocked-uuid",
                    username: "testuser",
                    mail: "test@example.com",
                    password: "hashed-password",
                }),
                { where: { id: "mocked-uuid" }, validate: false }
            );
        });
    });

    describe("getAll", () => {
        it("Doit retourner tous les utilisateurs", async () => {
            const mockUsers: TestUser[] = [
                {
                    id: "1",
                    username: "user1",
                    mail: "user1@example.com",
                    image: "bank-img-0.png",
                    content: null,
                    isAdmin: false,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];
            (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

            const result = await controller.getAll();

            expect(User.findAll).toHaveBeenCalledWith({
                attributes: { exclude: ["password", "token"] },
                order: [["createdAt", "desc"]],
            });
            expect(result).toEqual(mockUsers);
        });
    });

    describe("getOne", () => {
        it("Doit retourner un utilisateur spécifique", async () => {
            const mockUser = {
                id: "1",
                username: "user1",
                mail: "user1@example.com",
            };
            (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

            const result = await controller.getOne("1");

            expect(User.findByPk).toHaveBeenCalledWith("1", {
                attributes: { exclude: ["password", "token"] },
            });
            expect(result).toEqual(mockUser);
        });
    });

    describe("update", () => {
        it("Doit mettre à jour un utilisateur", async () => {
            (User.update as jest.Mock).mockResolvedValue([1]);

            const userData: userCreationAttributes = {
                username: "updateduser",
                mail: "updated@example.com",
                password: "newpassword",
            };
            await controller.update("user1", userData);

            expect(User.update).toHaveBeenCalledWith(userData, {
                where: { id: "user1" },
            });
        });
    });

    describe("filtre", () => {
        it("Doit filtrer les utilisateurs par recherche", async () => {
            const mockUsers = [
                { id: "1", username: "testuser", mail: "test@example.com" },
            ];
            (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

            const result = await controller.filtre("test");

            expect(User.findAll).toHaveBeenCalledWith({
                attributes: { exclude: ["password", "token"] },
                where: {
                    [Op.or]: [
                        { username: { [Op.like]: "%test%" } },
                        { mail: { [Op.like]: "%test%" } },
                    ],
                },
            });
            expect(result).toEqual(mockUsers);
        });
    });

    describe("password", () => {
        it("Doit mettre à jour le mot de passe", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({
                id: "user1",
                username: "testuser",
                mail: "test@example.com",
                password: "oldpassword", // État initial
                get: () => ({
                    id: "user1",
                    username: "testuser",
                    mail: "test@example.com",
                    password: "hashed-new-password", // Simule la modification dans le contrôleur
                }),
            });
            (Crypt.hash as jest.Mock).mockResolvedValue("hashed-new-password");
            jest.spyOn(controller, "update").mockResolvedValue(undefined);

            const data: passObj = {
                password: "oldpassword",
                newPassword: "newpassword",
                confirmPassword: "newpassword",
            };
            await controller.password("user1", data);

            expect(User.findByPk).toHaveBeenCalledWith("user1");
            expect(Crypt.hash).toHaveBeenCalledWith("newpassword");
            expect(controller.update).toHaveBeenCalledWith(
                "user1",
                expect.objectContaining({
                    id: "user1",
                    username: "testuser",
                    mail: "test@example.com",
                    password: "hashed-new-password",
                })
            );
        });
    });

    describe("image", () => {
        it("Doit mettre à jour l’image en supprimant l’ancienne si non-bank", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                id: "user1",
                username: "testuser",
                mail: "test@example.com",
                image: "old-image.png",
                get: () => ({
                    id: "user1",
                    username: "testuser",
                    mail: "test@example.com",
                    image: "new-image.png", // Simule la modification dans le contrôleur
                }),
            });
            (fs.promises.unlink as jest.Mock).mockResolvedValue(undefined);
            jest.spyOn(controller, "update").mockResolvedValue(undefined);

            const userData: userCreationAttributes = {
                id: "user1",
                username: "testuser",
                mail: "test@example.com",
                password: "password",
            };
            const file: Express.Multer.File = {
                filename: "new-image.png",
            } as any;

            await controller.image(userData, file);

            expect(User.findOne).toHaveBeenCalledWith({
                where: { id: "user1" },
            });
            expect(fs.promises.unlink).toHaveBeenCalledWith(
                "src/uploads/profil/old-image.png"
            );
            expect(controller.update).toHaveBeenCalledWith(
                "user1",
                expect.objectContaining({
                    id: "user1",
                    image: "new-image.png",
                })
            );
        });
    });

    describe("delete", () => {
        it("Doit supprimer un utilisateur et ses modules", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({
                id: "user1",
                username: "testuser",
                mail: "test@example.com",
                image: "user-image.png",
            });
            (Module.findAll as jest.Mock).mockResolvedValue([
                { id: "module1", image: "module-image.png" },
            ]);
            (fs.promises.unlink as jest.Mock).mockResolvedValue(undefined);
            (Module.destroy as jest.Mock).mockResolvedValue(1);
            (User.destroy as jest.Mock).mockResolvedValue(1);
            (Redis.deleteCache as jest.Mock).mockResolvedValue(undefined);

            await controller.delete("user1");

            expect(Redis.deleteCache).toHaveBeenCalledWith(KEYS.modules);
            expect(Module.findAll).toHaveBeenCalledWith({
                where: { user_id: "user1" },
            });
            expect(fs.promises.unlink).toHaveBeenCalledWith(
                "src/uploads/module/module-image.png"
            );
            expect(fs.promises.unlink).toHaveBeenCalledWith(
                "src/uploads/profil/user-image.png"
            );
            expect(Module.destroy).toHaveBeenCalledWith({
                where: { user_id: "user1" },
            });
            expect(User.destroy).toHaveBeenCalledWith({
                where: { id: "user1" },
            });
        });
    });

    describe("toggleActive", () => {
        it("Doit désactiver un utilisateur actif", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({
                id: "user1",
                username: "testuser",
                mail: "test@example.com",
                isActive: true,
                get: () => ({
                    id: "user1",
                    username: "testuser",
                    mail: "test@example.com",
                    isActive: true,
                }),
            });
            jest.spyOn(controller, "update").mockResolvedValue(undefined);

            await controller.toggleActive("user1");

            expect(User.findByPk).toHaveBeenCalledWith("user1");
            expect(controller.update).toHaveBeenCalledWith(
                "user1",
                expect.objectContaining({
                    id: "user1",
                    isActive: false,
                })
            );
        });
    });

    describe("follower", () => {
        it("Doit ajouter un suivi si inexistant", async () => {
            (Follow.findOne as jest.Mock).mockResolvedValue(null);
            (Follow.create as jest.Mock).mockResolvedValue({});

            await controller.follower("user1", "user2");

            expect(Follow.findOne).toHaveBeenCalledWith({
                where: { UserId: "user1", UserIdFollow: "user2" },
            });
            expect(Follow.create).toHaveBeenCalledWith({
                UserId: "user1",
                UserIdFollow: "user2",
            });
        });
    });

    describe("getNetwork", () => {
        it("Doit retourner le réseau d’un utilisateur", async () => {
            (Follow.count as jest.Mock)
                .mockResolvedValueOnce(2) // followingCount
                .mockResolvedValueOnce(3); // followerCount
            (Follow.findAll as jest.Mock)
                .mockResolvedValueOnce([
                    { UserIdFollow: "user2" },
                    { UserIdFollow: "user3" },
                ])
                .mockResolvedValueOnce([
                    { UserId: "user4" },
                    { UserId: "user5" },
                    { UserId: "user6" },
                ]);
            const mockUsers: UserWithoutSensitiveData[] = [
                {
                    id: "user2",
                    username: "user2",
                    mail: "user2@example.com",
                    image: "bank-img-0.png",
                    content: null,
                    isAdmin: false,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "user3",
                    username: "user3",
                    mail: "user3@example.com",
                    image: "bank-img-0.png",
                    content: null,
                    isAdmin: false,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "user4",
                    username: "user4",
                    mail: "user4@example.com",
                    image: "bank-img-0.png",
                    content: null,
                    isAdmin: false,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "user5",
                    username: "user5",
                    mail: "user5@example.com",
                    image: "bank-img-0.png",
                    content: null,
                    isAdmin: false,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "user6",
                    username: "user6",
                    mail: "user6@example.com",
                    image: "bank-img-0.png",
                    content: null,
                    isAdmin: false,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];
            jest.spyOn(controller, "getAll").mockResolvedValue(mockUsers);

            const result = await controller.getNetwork("user1");

            expect(Follow.count).toHaveBeenCalledWith({
                where: { UserId: "user1" },
            });
            expect(Follow.count).toHaveBeenCalledWith({
                where: { UserIdFollow: "user1" },
            });
            expect(result).toEqual({
                followingCount: 2,
                followerCount: 3,
                followings: [
                    {
                        id: "user2",
                        username: "user2",
                        mail: "user2@example.com",
                        image: "bank-img-0.png",
                        content: null,
                        isAdmin: false,
                        isActive: true,
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    },
                    {
                        id: "user3",
                        username: "user3",
                        mail: "user3@example.com",
                        image: "bank-img-0.png",
                        content: null,
                        isAdmin: false,
                        isActive: true,
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    },
                ],
                followers: [
                    {
                        id: "user4",
                        username: "user4",
                        mail: "user4@example.com",
                        image: "bank-img-0.png",
                        content: null,
                        isAdmin: false,
                        isActive: true,
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    },
                    {
                        id: "user5",
                        username: "user5",
                        mail: "user5@example.com",
                        image: "bank-img-0.png",
                        content: null,
                        isAdmin: false,
                        isActive: true,
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    },
                    {
                        id: "user6",
                        username: "user6",
                        mail: "user6@example.com",
                        image: "bank-img-0.png",
                        content: null,
                        isAdmin: false,
                        isActive: true,
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    },
                ],
            });
        });
    });

    describe("getNetworkCount", () => {
        it("Doit retourner le compte du réseau d’un utilisateur", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ id: "user1" });
            (Follow.count as jest.Mock)
                .mockResolvedValueOnce(2) // followingCount
                .mockResolvedValueOnce(3); // followerCount

            const result = await controller.getNetworkCount("testuser");

            expect(User.findOne).toHaveBeenCalledWith({
                where: { username: "testuser" },
                attributes: ["id"],
            });
            expect(result).toEqual({
                followingCount: 2,
                followerCount: 3,
            });
        });
    });
});
