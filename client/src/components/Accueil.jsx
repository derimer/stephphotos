// src/components/Accueil.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Import des images locales
import Salon from "../assets/images/image-81.webp";

function Accueil() {
  // Déclarez l'état pour stocker toutes les images
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const location = useLocation();

  // Images locales définies
  const localImages = [
    {
      filename: Salon,
      name: "Salon n&b",
      author: "Stéphane Valentin",
      exposure: "100 ISO - 18 mm - f/22 - 302 Sec",
    },
  ];

  const normalizeImageUrl = (filename) => {
    if (!filename) return "";
    return `${import.meta.env.VITE_API_URL}/uploads/${filename}`; // Assurez-vous que c'est correct
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
    }, 5000); // 10000 millisecondes = 10 secondes

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section
      id="pageContent"
      className="home"
      style={{
        backgroundImage: randomImage ? `url(${randomImage.filename})` : "none",
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
    </section>
  );
}

export default Accueil;
