require("dotenv").config();

const database = require("../database/client");

afterAll(async () => {
  await database.end(); // Ferme la connexion à la base de données après les tests
});

test("You have filled /server/.env with valid information to connect to your database", async () => {
  const [rows] = await database.query(`SELECT 1`);
  expect(rows.length).toBeGreaterThan(0);
});

test("You have executed the db:migrate and db:seed scripts", async () => {
  const [rows] = await database.query(`SELECT * FROM images`);
  expect(rows.length).toBeGreaterThan(0);
});
