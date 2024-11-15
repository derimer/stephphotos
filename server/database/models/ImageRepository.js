const AbstractRepository = require("./AbstractRepository");


class ImageRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "images" });
  }
 
  
  
  
    async create(imageData) {
      const { name, author, exposure, filename } = imageData;
      const [result] = await this.database.query(
        `INSERT INTO images (filename, name, author, exposure) VALUES (?, ?, ?, ?)`,
        [filename, name, author, exposure]
      );
      return result.insertId;
    }
  
    async read(id) {
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
  
    // Méthodes update et delete à implémenter
  
  
async update(){
  const { name, author, exposure, filename } = imageData;
  await this.database.query(
    `UPDATE ${this.table} SET filename = ?, name = ?, author = ?, exposure = ? WHERE id = ?`,
    [filename, name, author, exposure, id]
  );
}
  
  // The C of CRUD - Create operation

  
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}
  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id) {
  //   ...
  // }


module.exports = ImageRepository;