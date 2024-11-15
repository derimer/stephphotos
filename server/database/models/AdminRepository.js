const AbstractRepository = require("./AbstractRepository");

class AdminRepository extends AbstractRepository {
  constructor() {
    super({ table: "accueil" });

    
  }

  async getAllImages() {
    try {
      const rows = await this.database.query('SELECT * FROM accueil');
      return rows;
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
      throw error;
    }
  }

  async addImage(filename, name, author, exposure) {
    try {
      const [result] = await this.database.query(
        'INSERT INTO accueil (filename, name, author, exposure) VALUES (?, ?, ?, ?)',
        [filename, name, author, exposure]
      );
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'image:', error);
      throw error;
    }
  }

  async updateImage(id, filename, name, author, exposure) {
    try {
      const [result] = await this.database.query(
        'UPDATE accueil SET filename = ?, name = ?, author = ?, exposure = ? WHERE id = ?',
        [filename, name, author, exposure, id]
      );
      return result;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'image:', error);
      throw error;
    }
  }

  async deleteImage(id) {
    try {
      const [result] = await this.database.query('DELETE FROM accueil WHERE id = ?', [id]);
      return result;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
      throw error;
    }
  }
}

module.exports = AdminRepository;
