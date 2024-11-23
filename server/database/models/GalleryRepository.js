const AbstractRepository = require("./AbstractRepository");

class GalleryRepository extends AbstractRepository {
  constructor() {
    super({ table: "galeries" }); // Assurez-vous que cela pointe vers la bonne table
  }

  // Récupérer toutes les galeries
  async getAllGaleries() {
    try {
      const [rows] = await this.database.query("SELECT * FROM galeries");
      return rows;  // Retourne directement les lignes
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

  async getGaleryWithImages(id) {
    try {
      const query = `
        SELECT g.*, i.*
        FROM galeries g
        LEFT JOIN images i ON g.id = i.gallery_id
        WHERE g.id = ?;
      `;
      const [results] = await this.database.execute(query, [id]);
      return results; // Ajustez selon votre structure de données
    } catch (error) {
      console.error('Erreur lors de la récupération de la galerie avec images:', error);
      throw error;
    }
  }

  async createGalery(id, title) {
    try {
      const [result] = await this.database.query(
        "INSERT INTO galeries (id,title) VALUES (?, ?)",
        [id, title]
      );
      return { id: result.insertId, title };
    } catch (error) {
      console.error("Erreur lors de la création de la galerie:", error);
      throw error;
    }
  }

  // Modifier une galerie existante
  async updateGalery(id, title) {
    try {
      await this.database.query(
        "UPDATE galeries SET title = ?, title = ? WHERE id = ?",
        [id,title]
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la galerie:", error);
      throw error;
    }
  }



  async addImageToGalery(galleryId, filename, name) {
    try {
      // Validation des entrées
      if (!galleryId || !filename || !name) {
        throw new Error("Les champs galleryId, filename, ou name ne peuvent pas être vides.");
      }
  
      // Requête préparée avec les bonnes valeurs
      const [result] = await this.database.query(
        "INSERT INTO images (gallery_id, filename, name) VALUES (?, ?, ?)",
        [galleryId, filename, name] // Les valeurs à insérer
      );
  
      console.log("Résultat de l'insertion :", result);
  
      // Retourne le résultat de la requête si besoin
      return result;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image à la galerie:", error.message);
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
      console.error("Erreur lors de la récupération des images de la galerie:", error);
      throw error;
    }
  }
  
  // Supprimer une image d'une galerie
  async removeImageFromGalery(galleryId, imageId) {
    try {
      await this.database.query(
        "DELETE FROM images WHERE id = ? AND gallery_id = ?",
        [imageId, galleryId]
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image de la galerie:", error);
      throw error;
    }
  }

  

  // Supprimer une image d'une galerie
 
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