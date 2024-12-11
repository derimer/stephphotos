// src/components/Accueil.js
import { useEffect, useState } from "react";

// Import des images locales

import Nenuphars from "../assets/images/image-71.jpg";

function Accueil() {
  // Déclarez l'état pour stocker toutes les images
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  // Fonction pour normaliser l'URL des images
  const normalizeImageUrl = (filename) => {
    if (!filename) return "";
    return `http://localhost:3310/uploads/${filename}`; // Assurez-vous que c'est correct
  };

  // useEffect pour récupérer les images depuis l'API
  useEffect(() => {
    // Images locales définies
    const localImages = [
      {
        filename: Nenuphars, // Utilisez une chaîne de caractères ici
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
  }, []); // Ce useEffect ne s'exécute qu'une fois au montage du composant

  // Choisir une image aléatoire
  useEffect(() => {
    if (images.length > 0) {
      const chosenImage = images[Math.floor(Math.random() * images.length)];
      setRandomImage(chosenImage);
    }
  }, [images]); // Ce useEffect s'exécute chaque fois que le tableau `images` change


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
