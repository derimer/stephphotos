import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Gerbier from "../assets/images/image-2.webp";
import Pecheurs from "../assets/images/image-1.webp";
import Bouteilles from "../assets/images/image-19.webp";
import Acteur from "../assets/images/image-54.webp";
import Julie from "../assets/images/image-87.webp";
import Hotel from "../assets/images/image-25.webp";
import lilly8 from "../assets/images/image-3.webp";
import Lyon from "../assets/images/image-78.webp";
import Rmc from "../assets/images/image-97.jpg";
import Vintage from "../assets/images/image-96.webp";
import Coiffeur from "../assets/images/image-80.webp";
import Audray8 from "../assets/images/audray8.jpg";

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
          
        ],
      },
      gal2: {
        title: "voyages couleur",
        images: [
                
        Hotel,

                   
                 
          
          
          
          
        ],
      },
      gal3: {
        title: "sublime n&b",
        images: [        
          Pecheurs,
         
          
          
                 
          
          
          
          
        ],
      },
      gal4: {
        title: "sublime couleur",
        images: [    
           
          Bouteilles,
         
          
        ],
      },
      gal5: {
        title: "Portait n&b ",
        images: [     
          Acteur,
        ],
      },
      gal6: {
        title: "Portait couleur",
        images: [   
         Audray8,
        ],
      },
      gal7: {
        title: "Charme n&b",
        images: [     
          lilly8 ,
          
        ],
      },
      gal8: {
        title: "charme couleur",
        images: [     
          Julie,          
          
         
        ],
      },
      gal9: {
        title: "Evenements n&b",
        images: [     
          Lyon,
         
        ],
      },
      gal10: {
        title: "Evenements couleur",
        images: [    
         Rmc,
          
        ],
      },
      gal11: {
        title: "au quotidien n&b ",
        images: [    
       Vintage,
          
        ],
      },
      gal12: {
        title: "au quotidien couleur ",
        images: [    
        Coiffeur,
          
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
