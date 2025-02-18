// src/components/Accueil.js
import { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import imageCompression from 'browser-image-compression';
// Import des images locales
import Isabelle from "../assets/images/image-98.jpg";

function Accueil() {
  // Déclarez l'état pour stocker toutes les images
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const location = useLocation();

  // Images locales définies
  const localImages = [
    {
      filename: Isabelle,
      name: "vals",
      author: "stephanovalentinophoto",
      exposure: "100 ISO - 18 mm - f/22 - 302 Sec",
    },
  ];

  const normalizeImageUrl = (filename) => {
    if (!filename) return "";
    if (filename.startsWith("http")) return filename;
    const cleanFilename = filename.replace(/^\/uploads\//, "");
    // Ajout de paramètres de compression et format WebP
    return `${import.meta.env.VITE_API_URL}/uploads/${cleanFilename}?q=80&auto=format&fit=crop&w=800`;
  };
  
  // Fonction pour récupérer les images depuis l'API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/accueil`);
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();

        // Normalisez les URLs des images récupérées
        const normalizedImages = data.map((image) => ({
          ...image,
          filename: normalizeImageUrl(image.filename), // Utilisez image.filename ici
        }));

        // Fusionne les images locales avec celles de la BDD
        const allImages = localImages.concat(normalizedImages);
        setImages(allImages); // Met à jour l'état avec toutes les images
      } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
        setImages(localImages); // Utiliser uniquement les images locales en cas d'erreur
      }
    };

    fetchImages();
  }, []);

  // Choisir une image aléatoire
  useEffect(() => {
    if (images.length > 0) {
      const chosenImage = images[Math.floor(Math.random() * images.length)];
      setRandomImage(chosenImage);
    }
  }, [location, images]);

  // Défilement des images toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length > 0) {
        const chosenImage = images[Math.floor(Math.random() * images.length)];
        setRandomImage(chosenImage);
      }
    }, 20000); // 10000 millisecondes = 10 secondes

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section
      id="pageContent"
      className="home"
      style={{
        backgroundImage: randomImage ? `url(${randomImage.filename})` : "none",
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      <div id="pictInfo">
        {randomImage ? (
          <>
            <h1>{randomImage.name}</h1>
            <p>{randomImage.author}</p>
            <p>{randomImage.exposure}</p>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
  
      {/* Liens positionnés en bas au centre */}
      <div className="accueil-links">
        <Link to="/galleries/nb" className="sublime-link">
        <span className="cool" style={{ color: 'white' }}>N</span>
          <span style={{ color: 'black' }}>&</span>
          <span style={{ color: 'white' }}>B</span>
        </Link>
        
        <Link to="/galleries/color" className="sublime-link">
          <span className="cool" style={{ color: '#FF0000' }}>C</span>
          <span style={{ color: '#66CC66' }}>O</span>
          <span style={{ color: '#FF9966' }}>U</span>
          <span style={{ color: '#ADD8E6' }}>L</span>
          <span style={{ color: '#FFFF00' }}>E</span>
          <span style={{ color: '#7F00FF' }}>U</span>
          <span style={{ color: '#9400D3' }}>R</span>
        </Link>
      </div>
    </section>
  );
}  

export default Accueil;
