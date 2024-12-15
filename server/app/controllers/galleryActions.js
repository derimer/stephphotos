const Gallery = require("../../database/models/GalleryRepository");
const Image = require("../../database/models/ImageRepository");

exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.getAllGalleries();
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGallery = async (req, res) => {
  try {
    const newGallery = await Gallery.createGallery({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addImageToGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findGalleryById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Galerie non trouvée" });

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
    const images = await Gallery.getImagesFromGallery(req.params.id);
    res.status(200).json(images);
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Galerie non trouvée" });

    await Image.deleteImagesByGalleryId(gallery.id);
    await gallery.remove();

   return res.json({ message: "Galerie supprimée" });
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};

exports.deleteImageFromGallery = async (req, res) => {
  try {
    const { galleryId, imageId } = req.params;

    const gallery = await Gallery.findById(galleryId);
    if (!gallery) return res.status(404).json({ message: "Galerie non trouvée" });

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: "Image non trouvée" });

    gallery.images = gallery.images.filter((img) => img.id.toString() !== imageId);
    await gallery.save();
    await image.remove();

   return res.json({ message: "Image supprimée de la galerie" });
  } catch (error) {
  return  res.status(500).json({ message: error.message });
  }
};
