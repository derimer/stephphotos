// src/components/Accueil.js
import { useEffect, useState } from "react";

// Import des images locales

import Nenuphars from "../assets/images/image-71.jpg";

function Accueil() {
  // Déclarez l'état pour stocker toutes les images
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  // Images locales définies
  
  const normalizeImageUrl = (filename) => {
    if (!filename) return "";
    return `http://localhost:3310/uploads/${filename}`; // Assurez-vous que c'est correct
  };
  // Fonction pour récupérer les images depuis l'API
  useEffect(() => {
    // Déclaration des images locales à l'intérieur du useEffect
    const localImages = [
      {
        filename: Nenuphars,
        name: "Les nénuphars",
        author: "Stéphane Valentin",
        exposure: "100 ISO - 18 mm - f/22 - 302 Sec",
      },
    ];

    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accueil");
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();

        // Normalisez les URLs des images récupérées
        const normalizedImages = data.map((image) => ({
          ...image,
          filename: normalizeImageUrl(image.filename),
        }));

        // Fusionne les images locales avec celles de la BDD
        const allImages = localImages.concat(normalizedImages);
        setImages(allImages);
      } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
        setImages(localImages); // Utiliser uniquement les images locales en cas d'erreur
      }
    };

    fetchImages();
  }, []); // Aucune dépendance inutile ici

  // Choisir une image aléatoire
  useEffect(() => {
    if (images.length > 0) {
      const chosenImage = images[Math.floor(Math.random() * images.length)];
      setRandomImage(chosenImage);
    }
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
