// Admin.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

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
  const [imagesFetched, setImagesFetched] = useState(false);
  const navigate = useNavigate();
  
  
  const normalizeImageUrl = (filename) => {
    if (!filename) return "";
    if (filename.startsWith("http")) return filename;
    const cleanFilename = filename.replace(/^\/uploads\//, "");
    return `${import.meta.env.VITE_API_URL}/uploads/${cleanFilename}`;
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/messages`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des messages");
      const data = await response.json();
      setMessages(data);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des messages:", erreur);
      setError("Impossible de charger les messages");
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/accueil`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des images");
      const data = await response.json();
      setImages(
        data.map((image) => ({
          ...image,
          filename: normalizeImageUrl(image.filename),
        }))
      );
    } catch (erreur) {
      console.error("Erreur lors de la récupération des images:", erreur);
      setError("Impossible de charger les images");
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const fetchGalleries = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/galeries`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des galeries");
      const data = await response.json();
      const galleriesWithImages = data.map((gallery) => ({
        ...gallery,
        images: Array.isArray(gallery.images) ? gallery.images : [],
      }));
      setGalleries(galleriesWithImages);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des galeries:", erreur);
      setError("Impossible de charger les galeries");
    }
  }, []);

  const fetchGalleryImages = useCallback(async (galleryId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/galeries/${galleryId}/images`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des images");
      const data = await response.json();
      return data.map((image) => ({
        ...image,
        filename: normalizeImageUrl(image.filename),
      }));
    } catch (erreur) {
      console.error("Erreur lors de la récupération des images:", erreur);
      setError("ID de galerie invalide ou manquant.");
      return [];
    }
  }, []);

  const fetchImagesForGalleries = useCallback(async () => {
    const updatedGalleries = await Promise.all(
      galleries.map(async (gallery) => {
        const galleryImages = await fetchGalleryImages(gallery.id);
        return {
          ...gallery,
          images: galleryImages,
        };
      })
    );
    setGalleries(updatedGalleries);
    setImagesFetched(true);
  }, [galleries, fetchGalleryImages]);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  useEffect(() => {
    if (galleries.length > 0 && !imagesFetched) {
      fetchImagesForGalleries();
    }
  }, [galleries, imagesFetched, fetchImagesForGalleries]);

  
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const options = {
      maxSizeMB: 5, // Taille maximale en Mo
      maxWidthOrHeight: 2500, // Dimensions maximales
      useWebWorker: true, // Utilisation de Web Workers pour améliorer les performances
      initialQuality: 1, // Qualité initiale sans perte
    };

    try {
      const compressedFile = await imageCompression(selectedFile, options);
      setFile(compressedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (erreur) {
      console.error('Erreur lors de la compression de l\'image :', erreur);
    }
  };
  
  
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/accueil`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout de l'image");
      }
  
      const data = await response.json();
      setImages((prevImages) => [
        ...prevImages,
        {
          ...data.image,
          filename: normalizeImageUrl(data.image.filename),
        },
      ]);
  
      setNewImage({ name: "", author: "", exposure: "" });
      setFile(null);
      setPreview("");
    } catch (erreur) {
      console.error("Erreur lors de l'ajout de l'image:", erreur);
      setError("Erreur lors de l'ajout de l'image");
    }
  };
  

  const handleAddImageToGallery = async () => {
    if (!file || !newImage.name || !selectedGallery) {
      setError("Veuillez remplir tous les champs et sélectionner une galerie");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", newImage.name);
    formData.append("galleryId", selectedGallery);

    try {
      const url = `${import.meta.env.VITE_API_URL}/galeries/${selectedGallery}/images`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        throw new Error("Erreur lors de l'ajout de l'image à la galerie");

      const data = await response.json();

      setGalleries((prevGalleries) =>
        prevGalleries.map((gallery) => {
          if (gallery.id === parseInt(selectedGallery, 10)) {
            return {
              ...gallery,
              images: [
                ...gallery.images,
                { ...data, url: normalizeImageUrl(data.filename) },
              ],
            };
          }
          return gallery;
        })
      );

      setNewImage({ name: "" });
      setFile(null);
      setSelectedGallery("");
    } catch (erreur) {
      console.error("Erreur lors de l'ajout de l'image:", erreur);
      setError("Erreur lors de l'ajout de l'image");
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/messages/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Réponse du serveur:", errorData);
        throw new Error("Erreur lors de la suppression du message");
      }
  
      setMessages(messages.filter((message) => message.id !== id));
    } catch (err) {
      console.error("Erreur:", err); // Remplacez 'error' par 'err'
      setError("Erreur lors de la suppression du message");
    }
  };

  const handleDeleteImage = async (id, galleryId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/images/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Erreur lors de la suppression de l'image");

      if (galleryId) {
        setGalleries((prevGalleries) =>
          prevGalleries.map((gallery) =>
            gallery.id === galleryId
              ? {
                  ...gallery,
                  images: gallery.images.filter((image) => image.id !== id),
                }
              : gallery
          )
        );
      } else {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (erreur) {
      console.error("Erreur lors de la suppression de l'image:", erreur);
      setError("Erreur lors de la suppression de l'image");
    }
  };
 const fetchImagesAccueil = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/getAccueilImages`);
  const data = await response.json();
  setImages(data); // Met à jour les images après suppression
};

const handleDeleteImageAccueil = async (id) => {
  try {
    // Suppression de l'image
    await fetch(`${import.meta.env.VITE_API_URL}/deleteAccueilImage/${id}`, {
      method: "DELETE",
    });
    
   

    // Mise à jour de l'affichage après suppression
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));

    // Rafraîchir la liste des images
    fetchImagesAccueil(); // On re-récupère les images pour être sûr qu'elles soient à jour
  } catch (erreur) {
    console.error("Erreur lors de la suppression :", erreur);
  }
};

useEffect(() => {
  fetchImagesAccueil(); // Cette fonction est exécutée au montage initial
}, []); // Le tableau vide [] indique qu'on charge les images une seule fois

  return (
    <div className="gestion">
      <h1>Gestion des Images</h1>
      {error && <p className="error">{error}</p>}

      <div className="ajoutImage1">
        <h2 className="title">Ajouter une nouvelle image à l'accueil</h2>
        <label htmlFor="fileInput">Sélectionner une image</label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {preview && (
          <div>
            <h2>Prévisualisation:</h2>
            <img
              src={preview}
              alt="Prévisualisation"
              style={{ maxWidth: "300px" }}
            />
          </div>
        )}
        <label htmlFor="nameInput">Description</label>
        <input
          id="nameInput"
          type="text"
          placeholder="description"
          name="name"
          value={newImage.name || ""}
          onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
        />
        <label htmlFor="authorInput">Outil</label>
        <input
          id="authorInput"
          type="text"
          placeholder="outil"
          name="author"
          value={newImage.author || ""}
          onChange={(e) => setNewImage({ ...newImage, author: e.target.value })}
        />
        <label htmlFor="exposureInput">Réglages</label>
        <input
          id="exposureInput"
          type="text"
          placeholder="reglages"
          name="exposure"
          value={newImage.exposure || ""}
          onChange={(e) =>
            setNewImage({ ...newImage, exposure: e.target.value })
          }
        />
        <button type="button" id="ajouterImg" onClick={handleAddImage}>
          Ajouter l'image
        </button>
      </div>

      <div className="exist1">
        <h2 className="title">Images Accueil</h2>
        <ul className="uldajout">
          {Array.isArray(images) && images.length > 0 ? (
            images.map((image) => (
              <li key={image.id}>
                <div>
                  {image.name} - {image.author} - {image.exposure}
                </div>
                {image.filename && (
                  <img
                    src={normalizeImageUrl(image.filename)}
                    alt={image.name}
                    style={{ maxWidth: "150px", marginTop: "10px" }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteImageAccueil(image.id)}
                >
                  Supprimer
                </button>
              </li>
            ))
          ) : (
            <p>Aucune image à afficher.</p>
          )}
        </ul>
      </div>

      <div className="exist2">
        <h2 className="title">Messages des utilisateurs</h2>
        {messages.length > 0 ? (
  <ul>
    {messages.map((message) => (
      <li key={message.id}>
        <strong>
          {message.firstName} {message.lastName}
        </strong>{" "}
        ({message.email}):
        <p>{message.message}</p>
        <button  type="button"onClick={() => handleDeleteMessage(message.id)}>
          supprimer
        </button>
      </li>
    ))}
  </ul>
) : (
  <p>Aucun message à afficher.</p>
)}
      </div>

      <div className="ajoutImage2">
        <h2 className="title">Ajouter une image à une galerie</h2>
        <label htmlFor="fileInputGallery">Sélectionner une image</label>
        <input
          id="fileInputGallery"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <label htmlFor="nameInputGallery">Contexte de la photo</label>
        <input
          id="nameInputGallery"
          type="text"
          placeholder="contexte de la photo"
          name="name"
          value={newImage.name}
          onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
          required
        />
        <label htmlFor="gallerySelect">Sélectionner une galerie</label>
        <select
          id="gallerySelect"
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
        <button
          className="exist3"
          type="button"
          onClick={handleAddImageToGallery}
        >
          Ajouter l'image à la galerie
        </button>
      </div>
      {galleries.map((gallery) => (
<div key={gallery.id} className="exist">
  <h2>{gallery.title}</h2>
  <ul className="uldajout">
    {gallery.images && gallery.images.length > 0 ? (
      gallery.images.map((image) => (
        <li key={image.id}>
          <div>
            {image.name||null} - {image.author||null} - {image.exposure||null}
          </div>
          {image.filename && (
            <>
              <img
                src={normalizeImageUrl(image.filename)}
                alt={image.name}
                style={{ maxWidth: "150px", marginTop: "10px" }}
              />
              {/* Ajout du descriptif du contexte de l'image */}
              {image.context && (
                <p>{image.context||null}</p>
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => handleDeleteImage(image.id, gallery.id)}
          >
            Supprimer
          </button>
        </li>
      ))
    ) : (
      <p>Aucune image à afficher.</p>
    )}
  </ul>
  <div className="analytics-link">
    <h2>Google Analytics</h2>
    <a
      href="https://analytics.google.com/analytics/web/?hl=fr#/p479970485/reports/intelligenthome"
      target="_blank"
      rel="noopener noreferrer"
    >
      Accéder à Google Analytics
    </a>
  </div>
</div>

))}
   
    
    </div>
  );
}
