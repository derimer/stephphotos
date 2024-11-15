import { useState, useEffect } from "react";

export default function Admin() {
  const [images, setImages] = useState([]);
 
  const [newImage, setNewImage] = useState({
    name: "",
    author: "",
    exposure: "",
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  // Fonction pour normaliser l'URL des images
  const normalizeImageUrl = (filename) => {
    if (!filename) return '';
    
    if (filename.startsWith('http')) return filename;
    const cleanFilename = filename.replace(/^\/uploads\//, '');
    return `http://localhost:3310/uploads/${cleanFilename}`;
  };

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/admin/messages");
      if (!response.ok) throw new Error("Erreur lors de la récupération des messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Erreur:", error);
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
      setImages(data);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger les images");
    }
  };

  // Fetch Galleries
 

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
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image:", error);
      setError("Erreur lors de l'ajout de l'image");
    }
  };

  // Handle Add Gallery
  

  // Handle Delete Image
  const handleDeleteImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3310/api/images/${id}`, { method: "DELETE" });
      
      if (!response.ok) throw new Error("Erreur lors de la suppression de l'image");
      
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors de la suppression de l'image");
    }
  };

  // Handle Delete Message
  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3310/api/admin/messages/${id}`, { method: "DELETE" });
      
      if (!response.ok) throw new Error("Erreur lors de la suppression du message");

      console.log("Message supprimé avec succès");
      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors de la suppression du message");
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchImages();
     // Récupérez les galeries au chargement du composant
  }, []);

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
        
        <input type="text" placeholder="Nom" value={newImage.name} onChange={(e) => setNewImage({ ...newImage, name: e.target.value })} required />
        <input type="text" placeholder="Auteur" value={newImage.author} onChange={(e) => setNewImage({ ...newImage, author: e.target.value })} required />
        <input type="text" placeholder="Exposition" value={newImage.exposure} onChange={(e) => setNewImage({ ...newImage, exposure: e.target.value })} required />
        
        <button type="button" id="ajouterImg" onClick={handleAddImage}>Ajouter l'image</button>
        
        {/* Section pour gérer les galeries */}
       
        
     </div>

     {/* Section pour afficher les images existantes */}
     <div className="exist">
       <h2>Images Accueil</h2>
       <ul>
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

     {/* Section pour afficher les messages existants */}
     <div>
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
   </div>
 );
}