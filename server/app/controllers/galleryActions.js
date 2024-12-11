const Gallery = require("../../database/models/GalleryRepository");
const Image = require("../../database/models/ImageRepository");

exports.getAllGalleries = async (req, res) => {
  try {
    const galeries = await Gallery.getAllGalleries();
    res.json(galeries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGallery = async (req, res) => {
  const gallery = new Gallery({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newGallery = await gallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addImageToGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findGalleryById(req.params.id);
    if (!gallery)
      return res.status(404).json({ message: "Galerie non trouvée" });

    const image = await Gallery.addImageToGallery(
      gallery.id,
      req.file.filename,
      req.body.name
    );
    return res.status(201).json(image);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image à la galerie :", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getGalleryImages = async (req, res) => {
  try {
    const galleryId = req.params.id;
    const images = await Gallery.getImagesFromGallery(galleryId);
    return res.status(200).json(images);
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    return res.status(500).json({ message: error.message });
  }
};
exports.getImageUrl = async (galleryId) => {
  try {
    // Appeler la fonction du référentiel pour récupérer les données
    const gallery = await Gallery.findGalleryById(galleryId); // Correction ici
    if (!gallery) {
      return null; // Aucune image trouvée
    }
    // Retourner les données de l'image
    return gallery;
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    throw error;
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const galery = await Gallery.findById(req.params.id);
    if (!galery)
      return res.status(404).json({ message: "Galerie non trouvée" });

    await Image.deletegallery({ galery: galery.Id });
    await galery.remove();

    return res.json({ message: "Galerie supprimée" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteImageFromGallery = async (req, res) => {
  try {
    const { galeryId, imageId } = req.params;

    const galery = await Gallery.findById(galeryId);
    if (!galery)
      return res.status(404).json({ message: "Galerie non trouvée" });

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: "Image non trouvée" });

    galery.images = galery.images.filter((img) => img.toString() !== imageId);
    await galery.save();
    await image.remove();

    return res.json({ message: "Image supprimée de la galerie" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
