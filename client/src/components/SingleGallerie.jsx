import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Pecheur from "../assets/images/image-2.jpg";
import Gerbier from "../assets/images/image-6.jpg";
import Festival from "../assets/images/image-10.jpg";
import Paris from "../assets/images/image-14.jpg";
import Concert from "../assets/images/image-50.jpg";
import Horizon from "../assets/images/image-52.jpg";
import Plateau from "../assets/images/image-55.jpg";
import Ombre from "../assets/images/image-56.jpg";
import Billard from "../assets/images/image-57.jpg";
import Mer from "../assets/images/image-71.jpg";
import Chemin from "../assets/images/image-72.jpg";
import Foret from "../assets/images/image-73.jpg";
import Portugal from "../assets/images/image-1.jpg";
import Piscine from "../assets/images/image-4.jpg";
import Verres from "../assets/images/image-8.jpg";
import Perspective from "../assets/images/image-9.jpg";
import Salon from "../assets/images/image-16.jpg";
import Bouteilles from "../assets/images/image-18.jpg";
import News from "../assets/images/image-20.jpg";
import Gallerienb from "../assets/images/image-21.jpg";
import Miroire from "../assets/images/image-35.jpg";
import Sevillane from "../assets/images/image-36.jpg";
import Pallier from "../assets/images/image-44.jpg";
import Fleurs from "../assets/images/image-60.jpg";
import Auto from "../assets/images/image-61.jpg";
import Bar from "../assets/images/image-89.jpg";
import Christal from "../assets/images/image-94.jpg";
import Mariage from "../assets/images/image-15.jpg";
import Urban from "../assets/images/image-92.jpg";
import Cloche from "../assets/images/image-29.jpg";
import Printemps from "../assets/images/image-45.jpg";
import Fontaine from "../assets/images/image-46.jpg";
import Couloir from "../assets/images/image-47.jpg";
import Spectacle from "../assets/images/image-58.jpg";
import Lyon from "../assets/images/image-70.jpg";
import Rue from "../assets/images/image-76.jpg";
import Ruines from "../assets/images/image-77.jpg";
import Coiffeurs from "../assets/images/image-79.jpg";
import Sortie from "../assets/images/image-83.jpg";
import Miss from "../assets/images/image-84.jpg";
import Tasses from "../assets/images/image-91.jpg";
import Violons from "../assets/images/image-95.jpg";
import Audray from "../assets/images/image-13.jpg";
import Pilote from "../assets/images/image-41.jpg";
import Lily from "../assets/images/image-59.jpg";
import Masque from "../assets/images/image-87.jpg";
import Regards from "../assets/images/image-39.jpg";
import Vintage from "../assets/images/image-96.jpg";
import Centrale from "../assets/images/image-22.jpg";
import Fanny from "../assets/images/image-40.jpg";
import Audray2 from "../assets/images/image-42.jpg";
import Gare from "../assets/images/image-48.jpg";
import Julie from "../assets/images/image-86.jpg";
import Aude from "../assets/images/image-69.jpg";
import Lingerie1 from "../assets/images/image-68.jpg";
import Lingerie2 from "../assets/images/image-67.jpg";
import Cannes from "../assets/images/image-64.jpg";
import Aurore from "../assets/images/image-51.jpg";
import Audray3 from "../assets/images/image-33.jpg";
import Lily3 from "../assets/images/image-3.jpg";

export default function SingleGallery() {
  const [gallery, setGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const galId = searchParams.get("id");

  const staticGalleries = useMemo(() => ({
    gal1: {
      title: "Paysages",
      images: [
        Pecheur,
        Gerbier,
        Festival,
        Paris,
        Concert,
        Horizon,
        Plateau,
        Ombre,
        Billard,
        Mer,
        Chemin,
        Foret,
        Centrale,
      ],
    },
    gal2: {
      title: "N&B",
      images: [
        Portugal,
        Piscine,
        Verres,
        Perspective,
        Salon,
        Bouteilles,
        News,
        Gallerienb,
        Miroire,
        Sevillane,
        Pallier,
        Fleurs,
        Auto,
        Bar,
        Christal,
        Vintage,
        Gare,
      ],
    },
    gal3: {
      title: "Couleurs",
      images: [
        Bouteilles,
        Mariage,
        Urban,
        Cloche,
        Printemps,
        Fontaine,
        Couloir,
        Spectacle,
        Lyon,
        Rue,
        Ruines,
        Coiffeurs,
        Sortie,
        Miss,
        Tasses,
        Violons,
      ],
    },
    gal4: {
      title: "Portrait&charme",
      images: [
        Audray,
        Pilote,
        Lily,
        Masque,
        Regards,
        Fanny,
        Audray2,
        Julie,
        Aude,
        Lingerie1,
        Lingerie2,
        Cannes,
        Aurore,
        Audray3,
        Lily3,
      ],
    },
  }), []); // Aucune dépendance, car ces données sont statiques

  useEffect(() => {
    if (galId && staticGalleries[`gal${galId}`]) {
      setGallery(staticGalleries[`gal${galId}`]);
    } else {
      console.error("Invalid gallery ID or gallery not found");
      window.location.pathname = "/gallerie";
    }
  }, [galId, staticGalleries]);

  const normalizeImageUrl = (filename) => {
    if (!filename) return "";
    return `http://localhost:3310/uploads/${filename}`;
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:3310/api/galeries/${galId}/images`);
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
      
      const data = await response.json();
      

     // throw (data)
      const normalizedImages = Array.isArray(data)
  ? data.map((image) => ({
      ...image,
      filename: normalizeImageUrl(image.filename),
        }))
  : [];
      const allImages = [
        ...(staticGalleries[`gal${galId}`]?.images || []),
        ...normalizedImages,
      ];
     
      setImages(allImages);
    
  
    } catch (error) {
      console.error("Erreur lors de la récupération des images :", error);
      setImages(staticGalleries[`gal${galId}`]?.images || []);
    }
  };
  useEffect(() => {
    if(galId)
    fetchImages();
   
  }, [galId]);

  const showSinglePict = useCallback((imageSrc) => setSelectedImage(imageSrc), []);
  const closeSinglePict = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedImage) {
        closeSinglePict();
      }
    };

    const handleImageClick = (e) => {
      const clickedImage = e.target.closest("img");
      if (clickedImage && clickedImage.classList.contains("clickable-image")) {
        showSinglePict(clickedImage.src);
      } else if (selectedImage) {
        closeSinglePict();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleImageClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleImageClick);
    };
  }, [selectedImage, showSinglePict, closeSinglePict]);
  
  if (!gallery) return <p>Chargement de la galerie...</p>;

  return (
    <>
      <main id="singleGallery">
        <h1>{gallery.title}</h1>
        <ul>
       
          {images.map((image, index) => (
            <li key={image.id || `image-${index}`}>
              
              <img
                src={typeof image === "string" ? image : image.filename}
                alt={`${gallery.title} ${index + 1}`}
                className="clickable-image"
              />
            </li>
          ))}
        </ul>
      </main>
      {selectedImage && (
        <div
          id="galleryContainer"
          className="visible"
          role="dialog"
          aria-modal="true"
        >
          <img src={selectedImage} alt="" />
        </div>
      )}
    </>
  );
}