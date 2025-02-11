import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Gerbier from "../assets/images/image-2.webp";
import Bleudemer from "../assets/images/image-6.webp";
import Chemin from "../assets/images/image-14.webp";
import Concert from "../assets/images/image-50.webp";
import Grandsud from "../assets/images/image-52.webp";
import Isabelle from "../assets/images/image-55.webp";
import Ombre from "../assets/images/image-56.webp";
import Turquoise from "../assets/images/image-57.webp";
import Nenuphars from "../assets/images/image-71.webp";
import Piscine from "../assets/images/image-72.webp";
import Plagenb from "../assets/images/image-73.webp";
import Pecheur from "../assets/images/image-1.webp";
import Lilly2 from "../assets/images/image-4.webp";
import Boulanger from "../assets/images/image-8.webp";
import Billard from "../assets/images/image-9.webp";
import Bar from "../assets/images/image-16.webp";
import Salon from "../assets/images/image-18.webp";
import News from "../assets/images/image-20.webp";
import Gallerienb from "../assets/images/image-21.webp";
import Miroire from "../assets/images/image-35.webp";
import Sevillane from "../assets/images/image-36.webp";
import Pallier from "../assets/images/image-44.webp";
import Fleurs from "../assets/images/image-60.webp";
import Auto from "../assets/images/image-61.webp";
import Bar2 from "../assets/images/image-89.webp";
import Christal from "../assets/images/image-94.webp";
import Mariage from "../assets/images/image-15.webp";
import Urban from "../assets/images/image-92.webp";
import Cloche from "../assets/images/image-29.webp";
import Printemps from "../assets/images/image-45.webp";
import Fontaine from "../assets/images/image-46.webp";
import Spectacle from "../assets/images/image-58.webp";
import Lyon from "../assets/images/image-70.webp";
import Rue from "../assets/images/image-76.webp";
import Ruines from "../assets/images/image-77.webp";
import Coiffeurs from "../assets/images/image-79.webp";
import Sortie from "../assets/images/image-83.webp";
import Miss from "../assets/images/image-84.webp";
import Tasses from "../assets/images/image-91.webp";
import Violons from "../assets/images/image-95.webp";
import Vintage from "../assets/images/image-96.webp";
import Centrale from "../assets/images/image-22.webp";
import Gare from "../assets/images/image-48.webp";
import Cannes from "../assets/images/image-64.webp";
import Audray3 from "../assets/images/image-33.webp";
import Lily3 from "../assets/images/image-3.webp";
import Portugal from "../assets/images/image-26.webp";
import Pilote from "../assets/images/image-41.webp";
import Regards from "../assets/images/image-11.webp";
import Audray4 from "../assets/images/image-13.webp";
import Bain from "../assets/images/image-31.webp";
import Colonnes from "../assets/images/image-32.webp";
import Voisine from "../assets/images/image-40.webp";
import Acteur from "../assets/images/image-54.webp";
import Lilly5 from "../assets/images/image-59.webp";

export default function SingleGallery() {
  const [gallery, setGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const galId = searchParams.get("id");

  const staticGalleries = useMemo(
    () => ({
      gal1: {
        title: "Voyages n&b",
        images: [
          Gerbier,          
           Portugal,             
          Centrale,
          Sevillane,
          Gallerienb,
          Pecheur,
          Plagenb,
        ],
      },
      gal2: {
        title: "voyages couleur",
        images: [
                
         Bleudemer,
          Chemin,
          Grandsud,          
         Nenuphars,
          Turquoise,
          Isabelle,
          Piscine,

                   
                 
          
          
          
          
        ],
      },
      gal3: {
        title: "sublime n&b",
        images: [        
          Billard,
          Gare, 
          Vintage,
          Christal, 
          Bar, 
          Fleurs,
          Pallier, 
          Miroire, 
          News,
          Salon,
          Boulanger,
          Christal,
          Bar2,
          
          
                 
          
          
          
          
        ],
      },
      gal4: {
        title: "sublime couleur",
        images: [    
           
          Ombre,
          Mariage,
          Cloche,
          Printemps,
          Urban,
          Colonnes, 
          Fontaine,
          Spectacle, 
          Rue,
          Ruines,
          Coiffeurs,
          Sortie,
          Miss,
          Tasses,
          Violons,
          
        ],
      },
      gal5: {
        title: "Portait n&b ",
        images: [     
          Pilote,
          Voisine,
          Acteur,
          Lilly5,
        ],
      },
      gal6: {
        title: "Portait couleur",
        images: [   
         Audray4,
        ],
      },
      gal7: {
        title: "Charme n&b",
        images: [     
          Lily3,
          Lilly2,
          Regards,
        ],
      },
      gal8: {
        title: "charme couleur",
        images: [     
          Cannes,          
          Audray3,
          Bain,
         
        ],
      },
      gal9: {
        title: "Evenements n&b",
        images: [     
          Lyon,
          Auto,
        ],
      },
      gal10: {
        title: "Evenements couleur",
        images: [     
          Cannes,          
          Concert,
          
        ],
      },
    }),
    []
  ); // Aucune dépendance, car ces données sont statiques

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
    return `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
  };

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/galeries/${galId}/images`
      );
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

      const data = await response.json();

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
  }, [staticGalleries, galId]);

  useEffect(() => {
    if (galId) {
      fetchImages();
    }
  }, [galId, fetchImages]);

  const showSinglePict = useCallback(
    (imageSrc) => setSelectedImage(imageSrc),
    []
  );
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
