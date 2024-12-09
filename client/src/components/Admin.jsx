// Admin.jsx
import  { useState, useEffect } from "react";


export default function Admin() {
 
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    name: "",
    author: "",
    exposure: "",
  });
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  

  // Fonction pour normaliser l'URL des images
  const normalizeImageUrl = (filename) => {
    if (!filename) return '';
    if (filename.startsWith('http')) return filename;
    const newFilename = filename.replace(/^\/uploads\//, '');
    return `http://localhost:3310/uploads/${newFilename}`;
  };
 

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/admin/messages");
      if (!response.ok) throw new Error("Erreur lors de la récupération des messages");
      const data = await response.json();
      setMessages(data);
    } catch (erreur) {
      console.error("Erreur:", erreur);
      setError("Impossible de charger les messages");
    }
  };

  // Fetch Images
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/accueil");
      if (!response.ok) throw new Error("Erreur lors de la récupération des images");
      const data = await response.json();
      console.log("Images reçues:", data);
      setImages(data.map(image => ({
        ...image,
        filename: normalizeImageUrl(image.filename)
      })));
    } catch (erreur) {
      console.error("Erreur:", erreur);
      setError("Impossible de charger les images");
    }
  };

  // Fetch Galleries
  const fetchGalleries = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/galeries");
      if (!response.ok) throw new Error("Erreur lors de la récupération des galeries");
      const data = await response.json();
      setGalleries(data);
    } catch (erreur) {
      console.error("Erreur:", erreur);
      setError("Impossible de charger les galeries");
    }
  };

  // Fetch Images for a Gallery
  const fetchGalleryImages = async (galleryId) => {
    try {
      const response = await fetch(`http://localhost:3310/api/galeries/${galleryId}/images`);
      if (!response.ok) throw new Error("Erreur lors de la récupération des images de la galerie");
      const data = await response.json();
      return data.map(image => ({
        ...image,
        filename: normalizeImageUrl(image.filename)
      }));
    } catch (erreur) {
      console.error("Erreur:", erreur);
      setError("Impossible de charger les images de la galerie");
      return [];
    }
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle Add Image
  const handleAddImage = async () => {
    if (!file || !newImage.name || !newImage.author || !newImage.exposure) {
      setError("Veuillez remplir tous les champs et sélectionner une image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", newImage.name);
    formData.append("author", newImage.author);
    formData.append("exposure", newImage.exposure);

    try {
      const response = await fetch("http://localhost:3310/api/accueil", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'image");

      const data = await response.json();
      console.log("Réponse du serveur après ajout d'image:", data);

      setImages(prevImages => [...prevImages, {
        ...data.image,
        filename: normalizeImageUrl(data.image.filename)
      }]);

      setNewImage({ name: "", author: "", exposure: "" });
      setFile(null);
      setPreview("");
    } catch (erreur) {
      console.error("Erreur lors de l'ajout de l'image:", erreur);
      setError("Erreur lors de l'ajout de l'image");
    }
  };

  // Handle Add Image to Gallery
  const handleAddImageToGallery = async () => {
    if (!file || !newImage.name || !selectedGallery) {
      setError("Veuillez remplir tous les champs et sélectionner une galerie");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", newImage.name);
    formData.append("galerieId", selectedGallery);

    try {
      const url = `http://localhost:3310/api/galeries/${selectedGallery}/images`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'image à la galerie");

      const data = await response.json();
      setGalleries(prevGalleries => prevGalleries.map(gallery => {
        if (gallery.id === selectedGallery) {
          return {
            ...gallery,
            images: [...gallery.images, {
              ...data.image,
              filename: normalizeImageUrl(data.image.filename)
            }]
          };
        }
        return gallery;
      }));

      setNewImage({ name: "" });
      setFile(null);
      setPreview("");
      setSelectedGallery("");
    } catch (erreur) {
      console.error("Erreur lors de l'ajout de l'image:", erreur);
      setError("Erreur lors de l'ajout de l'image");
    }
  };

  // Handle Delete Image
  const handleDeleteImage = async (id, galleryId) => {
    try {
      const response = await fetch(`http://localhost:3310/api/images/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur lors de la suppression de l'image");
      setGalleries(prevGalleries => prevGalleries.map(gallery => {
        if (gallery.id === galleryId) {
          return {
            ...gallery,
            images: gallery.images.filter(image => image.id !== id)
          };
        }
        return gallery;
      }));
    } catch (erreur) {
      console.error("Erreur:", erreur);
      setError("Erreur lors de la suppression de l'image");
    }
  };

  // Handle Delete Message
  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3310/api/admin/messages/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur lors de la suppression du message");
      setMessages(messages.filter((message) => message.id !== id));
    } catch (erreur) {
      console.error("Erreur:", errr);
      setError("Erreur lors de la suppression du message");
    }
  };

  useEffect(() => {
    
      fetchMessages();
      fetchImages();
      fetchGalleries();
     // Redirige vers la page de connexion si non authentifié
   
  }, [ ]);

  useEffect(() => {
    const fetchImagesForGalleries = async () => {
      const updatedGalleries = await Promise.all(galleries.map(async (gallery) => {
         await fetchGalleryImages(gallery.id);
        return {
          ...gallery,
          images
        };
      }));
      setGalleries(updatedGalleries);
    };

    if (galleries.length > 0) {
      fetchImagesForGalleries();
    }
  }, [fetchGalleryImages]);

 
  return (
    <div className="gestion">
      <h1>Gestion des Images</h1>
      {error && <p className="error">{error}</p>}

      <div className="ajoutImage">
        <h2>Ajouter une nouvelle image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        {preview && (
          <div>
            <h2>Prévisualisation:</h2>
            <img src={preview} alt="Prévisualisation" style={{ maxWidth: "300px" }} />
          </div>
        )}
        <input type="text" placeholder="Nom" name="name" value={newImage.name} onChange={(e) => setNewImage({ ...newImage, name: e.target.value })} required />
        <input type="text" placeholder="Auteur" name="author" value={newImage.author} onChange={(e) => setNewImage({ ...newImage, author: e.target.value })} required />
        <input type="text" placeholder="Exposition" name="exposure" value={newImage.exposure} onChange={(e) => setNewImage({ ...newImage, exposure: e.target.value })} required />
        <button type="button" id="ajouterImg" onClick={handleAddImage}>Ajouter l'image</button>
      </div>

      <div className="exist">
        <h2>Images Accueil</h2>
        <ul className="uldajout">
          {Array.isArray(images) && images.length > 0 ? (
            images.map((image) => (
              <li key={image.id}>
                <div>{image.name} - {image.author} - {image.exposure}</div>
                {image.filename && (
                  <img src={normalizeImageUrl(image.filename)} alt={image.name} style={{ maxWidth: "150px", marginTop: "10px" }} />
                )}
                <button type="button" onClick={() => handleDeleteImage(image.id)}>Supprimer</button>
              </li>
            ))
          ) : (
            <p>Aucune image à afficher.</p>
          )}
        </ul>
      </div>

      <div className="exist">
        <h2>Messages des utilisateurs</h2>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <strong>{message.firstName} {message.lastName}</strong> ({message.email}):
                <p>{message.message}</p>
                <button type="button" onClick={() => handleDeleteMessage(message.id)}>supprimer</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun message à afficher.</p>
        )}
      </div>

      <div className="ajoutImage">
        <h2>Ajouter une image à une galerie</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <input type="text" placeholder="Nom" name="name" value={newImage.name} onChange={(e) => setNewImage({ ...newImage, name: e.target.value })} required />
        <select
          value={selectedGallery}
          onChange={(e) => setSelectedGallery(e.target.value)}
          required
        >
          <option value="">Sélectionner une galerie</option>
          {galleries.map((gallery) => (
            <option key={gallery.id} value={gallery.id}>
              {gallery.title}
            </option>
          ))}
        </select>
        <button className="exist" type="button" onClick={handleAddImageToGallery}>Ajouter l'image à la galerie</button>
      </div>

      {galleries.map(gallery => (
        <div key={gallery.id} className="exist">
          <h2>{gallery.title}</h2>
          <ul className="uldajout">
            {gallery.images && gallery.images.length > 0 ? (
              gallery.images.map((image) => (
                <li key={image.id}>
                  <div>{image.name} - {image.author} - {image.exposure}</div>
                  {image.filename && (
                    <img src={normalizeImageUrl(image.filename)} alt={image.name} style={{ maxWidth: "150px", marginTop: "10px" }} />
                  )}
                  <button type="button" onClick={() => handleDeleteImage(image.id, gallery.id)}>Supprimer</button>
                </li>
              ))
            ) : (
              <p>Aucune image à afficher.</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}