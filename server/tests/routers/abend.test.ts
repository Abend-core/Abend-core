/// <reference types="jest" />

import request from "supertest";
import express from "express";
import router from "../../src/routes/abend";
import AbendController from "../../src/controllers/abend";

// Mock du contrôleur
jest.mock("../../src/controllers/abend");

const app = express();
app.use(router);

describe("Abend Router", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /stats", () => {
        it("Doit retourner 200 avec les statistiques", async () => {
            (AbendController.statistique as jest.Mock).mockResolvedValue({
                nbModule: 5,
                nbUser: 10,
                nbVisite: 100,
            });

            const response = await request(app).get("/stats");
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                stats: { nbModule: 5, nbUser: 10, nbVisite: 100 },
            });
        });

        it("Doit retourner 500 si une erreur survient", async () => {
            (AbendController.statistique as jest.Mock).mockRejectedValue(
                new Error("Erreur DB")
            );

            const response = await request(app).get("/stats");
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Erreur serveur.",
                error: "Erreur DB",
            });
        });
    });
});
