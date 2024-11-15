// src/components/Accueil.js
import { useEffect, useState } from "react";

// Import des images locales
import Pecheur from "../assets/images/image-1.jpg";
import Gerbier from "../assets/images/image-2.jpg";
import Festival from "../assets/images/image-58.jpg";
import Paris from "../assets/images/image-75.jpg";
import Concert from "../assets/images/image-5.jpg";
import Horizon from "../assets/images/image-6.jpg";
import Plateau from "../assets/images/image-7.jpg";
import Ombre from "../assets/images/image-83.jpg";
import Billard from "../assets/images/image-9.jpg";
import Mer from "../assets/images/image-10.jpg";
import Chemin from "../assets/images/image-14.jpg";
import Foret from "../assets/images/image-12.jpg";
import Portugal from "../assets/images/image-26.jpg";
import Plage from "../assets/images/image-73.jpg";
import Piscine from "../assets/images/image-72.jpg";
import Verres from "../assets/images/image-94.jpg";
import Perspective from "../assets/images/image-17.jpg";
import Salon from "../assets/images/image-18.jpg";
import Bouteilles from "../assets/images/image-19.jpg";
import Lebar from "../assets/images/image-89.jpg";
import Ruines from "../assets/images/image-77.jpg";
import Nenuphars from "../assets/images/image-71.jpg";

function Accueil() {
  // Déclarez l'état pour stocker toutes les images
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  // Images locales définies
  const localImages = [
    { filename: Pecheur, name: "Pécheurs", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Gerbier, name: "Mont Gerbier sous la neige", author: "Stéphane Valentin", exposure: "200 ISO - 150 mm - f/10 - 1/320 Sec" },
    { filename: Festival, name: "Festival", author: "Stéphane Valentin", exposure: "100 ISO - 59 mm - f/13 - 1/250 Sec" },
    { filename: Paris, name: "Paris", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 531 Sec" },
    { filename: Concert, name: "Concert", author: "Stéphane Valentin", exposure: "100 ISO - 128 mm - f/11 - 1/250 Sec" },
    { filename: Horizon, name: "L'horizon", author: "Stéphane Valentin", exposure: "100 ISO - 150 mm - f/28 - 1/320 Sec" },
    { filename: Plateau, name: "Plateau ardéchois enneigé", author: "Stéphane Valentin", exposure: "100 ISO - 26 mm - f/10 - 1/100 Sec" },
    { filename: Ombre, name: "Ombre lumière", author: "Stéphane Valentin", exposure: "100 ISO - 37 mm - f/11 - 1/400 Sec" },
    { filename: Billard, name: "Le billard", author: "Stéphane Valentin", exposure: "100 ISO - 24 mm - f/5 - 1/200 Sec" },
    { filename: Mer, name: "La mer qu'on voit danser...", author: "Stéphane Valentin", exposure: "200 ISO - 150 mm - f/6.3 - 1/320 Sec" },
    { filename: Chemin, name: "Chemin de rando", author: "Stéphane Valentin", exposure: "200 ISO - 39 mm - f/10 - 1/640 Sec" },
    { filename: Foret, name: "La forêt", author: "Stéphane Valentin", exposure: "100 ISO - 20 mm - f/11 - 1/80 Sec" },
    { filename: Portugal, name: "Portugal", author: "Stéphane Valentin", exposure: "200 ISO - 39 mm - f/13 - 1/200 Sec" },
    { filename: Plage, name: "Plage n&b", author: "Stéphane Valentin", exposure: "200 ISO - 70 mm - f/8.0 - 1/100 Sec" },
    { filename: Piscine, name: "Piscine nature", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Verres, name: "Verres", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Perspective, name: "Perspective", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Salon, name: "Salon n&b", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Bouteilles, name: "Bleu bouteilles", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Lebar, name: "Le bar", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Ruines, name: "Un autre temps", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" },
    { filename: Nenuphars, name: "Les nénuphars", author: "Stéphane Valentin", exposure: "100 ISO - 18 mm - f/22 - 302 Sec" }
  ];
  const normalizeImageUrl = (filename) => {
    if (!filename) return '';
    return `http://localhost:3310/uploads/${filename}`; // Assurez-vous que c'est correct
  };
  // Fonction pour récupérer les images depuis l'API
  useEffect(() => {
    const fetchImages = async () => {
        try {
            const response = await fetch("http://localhost:3310/api/accueil");
            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

            const data = await response.json();
            console.log("Données récupérées :", data); // Log des données reçues

            // Normalisez les URLs des images récupérées
            const normalizedImages = data.map(image => ({
                ...image,
                filename: normalizeImageUrl(image.filename), // Utilisez image.filename ici
            }));
            console.log("Images normalisées :", normalizedImages); // Log après normalisation

            // Fusionne les images locales avec celles de la BDD
            const allImages = localImages.concat(normalizedImages);
            setImages(allImages); // Met à jour l'état avec toutes les images
            console.log("Toutes les images après ajout :", allImages); // Log final

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
  }, [images]);

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
