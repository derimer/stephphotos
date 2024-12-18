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
        JOIN galleries ON images.gallery_id = galleries.id
        WHERE galleries.id = ?
      `;
      const [rows] = await this.database.query(query, [galleryId]);

      if (rows.length === 0) {
        return null; // Aucune image trouvée
      }

      // Retourner les informations de la première image trouvée
      return {
        id: rows[0].id,
        name: rows[0].name,
        filename: rows[0].filename,
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des images:", error);
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
    try {
      await this.database.query("DELETE FROM galeries WHERE id = ?", [id]);
    } catch (error) {
      console.error("Erreur lors de la suppression de la galerie:", error);
      throw error;
    }
  }
}

module.exports = new GalleryRepository(); // <-- Exportez la classe, pas une instance
