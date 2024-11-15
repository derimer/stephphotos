const AbstractRepository = require("./AbstractRepository");

class ContactRepository extends AbstractRepository {
  constructor() {
    super({ table: "Contact" });
  }

  async create({ firstName, lastName, email, message }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstName, lastName, email, message) VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, message]
    );

    return result.insertId;
  }

  async readById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(id, { firstName, lastName, email, message }) {
    const query = `UPDATE ${this.table} SET firstName = ?, lastName = ?, email = ?, message = ? WHERE id = ?`;
    await this.database.query(query, [firstName, lastName, email, message, id]);
  }

  async deleteById(id) {
    try {
      console.error("appel");
      const result = await this.database.query(
        "DELETE FROM Contact WHERE id = ?",
        [id]
      );
      return result; // Retournez le résultat pour un éventuel traitement
    } catch (error) {
      console.error("Erreur lors de la suppression du contact :", error);
      throw error; // Relancez l'erreur pour une gestion ultérieure
    }
  }
}

module.exports = ContactRepository;