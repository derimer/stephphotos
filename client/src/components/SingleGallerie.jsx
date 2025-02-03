import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Pecheur from "../assets/images/image-2.webp";
import Gerbier from "../assets/images/image-6.webp";
import Festival from "../assets/images/image-10.webp";
import Paris from "../assets/images/image-14.webp";
import Concert from "../assets/images/image-50.webp";
import Horizon from "../assets/images/image-52.webp";
import Plateau from "../assets/images/image-55.webp";
import Ombre from "../assets/images/image-56.webp";
import Billard from "../assets/images/image-57.webp";
import Mer from "../assets/images/image-71.webp";
import Chemin from "../assets/images/image-72.webp";
import Foret from "../assets/images/image-73.webp";
import Portugal from "../assets/images/image-1.webp";
import Piscine from "../assets/images/image-4.webp";
import Verres from "../assets/images/image-8.webp";
import Perspective from "../assets/images/image-9.webp";
import Salon from "../assets/images/image-16.webp";
import Bouteilles from "../assets/images/image-18.webp";
import News from "../assets/images/image-20.webp";
import Gallerienb from "../assets/images/image-21.webp";
import Miroire from "../assets/images/image-35.webp";
import Sevillane from "../assets/images/image-36.webp";
import Pallier from "../assets/images/image-44.webp";
import Fleurs from "../assets/images/image-60.webp";
import Auto from "../assets/images/image-61.webp";
import Bar from "../assets/images/image-89.webp";
import Christal from "../assets/images/image-94.webp";
import Mariage from "../assets/images/image-15.webp";
import Urban from "../assets/images/image-92.webp";
import Cloche from "../assets/images/image-29.webp";
import Printemps from "../assets/images/image-45.webp";
import Fontaine from "../assets/images/image-46.webp";
import Couloir from "../assets/images/image-47.webp";
import Spectacle from "../assets/images/image-58.webp";
import Lyon from "../assets/images/image-70.webp";
import Rue from "../assets/images/image-76.webp";
import Ruines from "../assets/images/image-77.webp";
import Coiffeurs from "../assets/images/image-79.webp";
import Sortie from "../assets/images/image-83.webp";
import Miss from "../assets/images/image-84.webp";
import Tasses from "../assets/images/image-91.webp";
import Violons from "../assets/images/image-95.webp";
import Audray from "../assets/images/image-13.webp";
import Pilote from "../assets/images/image-41.webp";
import Lily from "../assets/images/image-59.webp";
import Masque from "../assets/images/image-87.webp";
import Regards from "../assets/images/image-39.webp";
import Vintage from "../assets/images/image-96.webp";
import Centrale from "../assets/images/image-22.webp";
import Fanny from "../assets/images/image-40.webp";
import Audray2 from "../assets/images/image-42.webp";
import Gare from "../assets/images/image-48.webp";
import Julie from "../assets/images/image-86.webp";
import Aude from "../assets/images/image-69.webp";
import Lingerie1 from "../assets/images/image-68.webp";
import Lingerie2 from "../assets/images/image-67.webp";
import Cannes from "../assets/images/image-64.webp";
import Audray3 from "../assets/images/image-33.webp";
import Lily3 from "../assets/images/image-3.webp";

export default function SingleGallery() {
  const [gallery, setGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const galId = searchParams.get("id");

  const staticGalleries = useMemo(
    () => ({
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
          Audray3,
          Lily3,
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
