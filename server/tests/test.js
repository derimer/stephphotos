const request = require("supertest");
const app = require("../index"); // Importez votre application Express

let server;

beforeAll(() => {
  // Démarrez le serveur avant les tests
  server = app.listen(3001);
});

afterAll(() => {
  // Fermez le serveur après les tests
  server.close();
});

describe("Test des routes API", () => {
  it("GET /api/test-db devrait retourner un message de succès", async () => {
    const response = await request(app).get("/api/test-db");
    expect(response.status).toBe(200); // Vérifiez que le statut est 200
    expect(response.body.message).toBe("Connexion à la base de données réussie");
  });

  it("GET /api/route-inexistante devrait retourner 404", async () => {
    const response = await request(app).get("/api/route-inexistante");
    expect(response.status).toBe(404); // Vérifiez que le statut est 404
  });
});