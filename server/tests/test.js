require('dotenv').config();

const request = require("supertest");
const app = require("../index"); // Importez votre application Express

const database = require("../database/client");



describe("Tests des routes API", () => {
  it("devrait retourner un succès pour /api/test", async () => {
    const response = await request(app).get("/api/test");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("succès", true);
  });
});
afterAll(async () => {
  await database.end(); // Ferme la connexion à la base de données après les tests
});
