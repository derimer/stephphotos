const AbstractRepository = require("./AbstractRepository");

class GalleryRepository extends AbstractRepository {
  constructor() {
    super({ table: "galleries" }); // Assurez-vous que cela pointe vers la bonne table
  }

  // Récupérer toutes les galeries
  async getAllGaleries() {
    try {
      const rows = await this.database.query("SELECT * FROM galeries");
      return rows;
    } catch (error) {
      console.error("Erreur lors de la récupération des galeries:", error);
      throw error;
    }
  }

  // Ajouter une nouvelle galerie
  async addGalery(galleryId, title) {
    try {
      const [result] = await this.database.query(
        "INSERT INTO galeries (gallery_id, title) VALUES (?, ?)",
        [galleryId, title]
      );
      return result;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la galerie:", error);
      throw error;
    }
  }

  // Modifier une galerie existante
  async updateGalery(id, title) {
    try {
      const [result] = await this.database.query(
        "UPDATE galeries SET title = ? WHERE id = ?",
        [title, id]
      );
      return result;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la galerie:", error);
      throw error;
    }
  }

  // Supprimer une galerie
  async deleteGalery(id) {
    try {
      const [result] = await this.database.query("DELETE FROM galeries WHERE id = ?", [id]);
      return result;
    } catch (error) {
      console.error("Erreur lors de la suppression de la galerie:", error);
      throw error;
    }
  }
}

module.exports = GalleryRepository; // Mettez à jour l'exportation