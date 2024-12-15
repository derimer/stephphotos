const AbstractRepository = require("./AbstractRepository");

class GalleryRepository extends AbstractRepository {
  constructor() {
    super({ table: "galeries" });
  }

  async getAllGalleries() {
    try {
      const [rows] = await this.database.query("SELECT * FROM galeries");
      return rows;
    } catch (error) {
      console.error("Erreur lors de la récupération des galeries:", error);
      throw error;
    }
  }

  async createGallery(title, description) {
    try {
      const [result] = await this.database.query(
        "INSERT INTO galeries (title, description) VALUES (?, ?)",
        [title, description]
      );
      return { id: result.insertId, title, description };
    } catch (error) {
      console.error("Erreur lors de la création de la galerie:", error);
      throw error;
    }
  }

  async findGalleryById(id) {
    try {
      const [rows] = await this.database.query(
        "SELECT * FROM galeries WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Erreur lors de la récupération de la galerie:", error);
      throw error;
    }
  }

  async addImageToGallery(galleryId, filename, name) {
    try {
      const [result] = await this.database.query(
        "INSERT INTO images (gallery_id, filename, name) VALUES (?, ?, ?)",
        [galleryId, filename, name]
      );
      return { id: result.insertId, galleryId, filename, name };
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image à la galerie:", error);
      throw error;
    }
  }

  async getImageByGalleryId(galleryId) {
    try {
      const query = `
        SELECT images.id, images.name, images.filename
        FROM images
        WHERE gallery_id = ?
        LIMIT 1
      `;
      const [rows] = await this.database.query(query, [galleryId]);
  
      if (rows.length === 0) {
        return null; // Aucune image trouvée
      }
  
      return rows[0]; // Retourner directement la première image
    } catch (error) {
      console.error("Erreur lors de la récupération de la première image:", error);
      throw error;
    }
  }
  

  async getImagesFromGallery(galleryId) {
    try {
      const [rows] = await this.database.query(
        "SELECT * FROM images WHERE gallery_id = ?",
        [galleryId]
      );
      return rows;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des images de la galerie:",
        error
      );
      throw error;
    }
  }

  async removeImageFromGallery(galleryId, imageId) {
    try {
      await this.database.query(
        "DELETE FROM images WHERE id = ? AND gallery_id = ?",
        [imageId, galleryId]
      );
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'image de la galerie:",
        error
      );
      throw error;
    }
  }
  
  async deleteGallery(id) {
    const connection = await this.database.getConnection(); // Si vous utilisez une transaction
    try {
      await connection.beginTransaction(); // Démarrer une transaction
  
      // Supprimer les images associées
      await connection.query("DELETE FROM images WHERE gallery_id = ?", [id]);
  
      // Supprimer la galerie
      await connection.query("DELETE FROM galeries WHERE id = ?", [id]);
  
      await connection.commit(); // Valider la transaction
    } catch (error) {
      await connection.rollback(); // Annuler la transaction en cas d'erreur
      console.error("Erreur lors de la suppression de la galerie:", error);
      throw error;
    } finally {
      connection.release(); // Libérer la connexion
    }
  }
  
}

module.exports =  new GalleryRepository; // <-- Exportez la classe, pas une instance