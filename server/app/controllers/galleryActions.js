const Gallery = require('../../database/models/GalleryRepository');
const Image = require('../../database/models/ImageRepository');

exports.getAllGalleries = async (req, res) => {
  try {
    const galeries = await Gallery.find().populate('images');
    res.json(galeries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const galery = await Gallery.findById(req.params.id).populate('images');
    if (!galery) return res.status(404).json({ message: 'Galerie non trouvée' });
   return res.json(galery);
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};

exports.createGallery = async (req, res) => {
  const gallery = new Gallery({
    title: req.body.title,
    description: req.body.description
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
    const galery = await Gallery.findById(req.params.id);
    if (!galery) return res.status(404).json({ message: 'Galerie non trouvée' });

    const image = new Image({
      filename: req.file.filename,
      title: req.body.title,
      gallery: galery.id
    });

    const savedImage = await image.save();
    galery.images.push(savedImage.id);
    await galery.save();

    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const galery = await Gallery.findById(req.params.id);
    if (!galery) return res.status(404).json({ message: 'Galerie non trouvée' });

    await Image.deleteMany({ galery: galery.Id });
    await galery.remove();

    res.json({ message: 'Galerie supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteImageFromGallery = async (req, res) => {
  try {
    const { galeryId, imageId } = req.params;
    
    const galery = await Gallery.findById(galeryId);
    if (!galery) return res.status(404).json({ message: 'Galerie non trouvée' });

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: 'Image non trouvée' });

    galery.images = galery.images.filter(img => img.toString() !== imageId);
    await galery.save();
    await image.remove();

    res.json({ message: 'Image supprimée de la galerie' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};