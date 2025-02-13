const request = require("supertest");
const app = require("../app"); // Assure-toi que ton app Express est exportée

describe("Test de l'API", () => {
    it("Doit créer un utilisateur", async () => {
        const res = await request(app).post("/users").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });
        expect(res.statusCode).toBe(200);
    });

    it("Doit récupérer tous les utilisateurs", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
    });

    it("Doit récupérer un utilisateur spécifique", async () => {
        const res = await request(app).get("/users/1");
        expect(res.statusCode).toBe(200);
    });

    it("Doit modifier un utilisateur", async () => {
        const res = await request(app).patch("/users/1").send({
            username: "newUsername",
        });
        expect(res.statusCode).toBe(200);
    });

    it("Doit supprimer un utilisateur", async () => {
        const res = await request(app).delete("/users/1");
        expect(res.statusCode).toBe(200);
    });
});
