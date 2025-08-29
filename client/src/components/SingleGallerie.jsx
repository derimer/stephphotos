import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Gerbier from "../assets/images/image-103.webp";
import Regards from "../assets/images/image-102.webp";
import Bouteilles from "../assets/images/image-19.webp";
import Acteur from "../assets/images/image-54.webp";
import Julie from "../assets/images/image-87.webp";
import Hotel from "../assets/images/image-25.webp";
import lilly8 from "../assets/images/lilly8.webp";
import Lyon from "../assets/images/image-78.webp";
import Autorose from "../assets/images/image-101.webp";
import Vintage from "../assets/images/image-100.webp";
import Coiffeur from "../assets/images/image-80.webp";
import Audray8 from "../assets/images/audray8.webp";

export default function SingleGallery() {
  const [gallery, setGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const galId = searchParams.get("id");

  const staticGalleries = useMemo(() => ({
    gal1: { title: "Voyages N & B", images: [Gerbier] },
    gal2: { title: "Voyages Couleur", images: [Hotel] },
    gal3: { title: "Sublime N & B", images: [Regards] },
    gal4: { title: "Sublime Couleur", images: [Bouteilles] },
    gal5: { title: "Portait N & B", images: [Acteur] },
    gal6: { title: "Portait Couleur", images: [Audray8] },
    gal7: { title: "Charme N & B", images: [lilly8] },
    gal8: { title: "Charme Couleur", images: [Julie] },
    gal9: { title: "Evenements N & B", images: [Lyon] },
    gal10: { title: "Evenements Couleur", images: [Autorose] },
    gal11: { title: "Au Quotidien N & B", images: [Vintage] },
    gal12: { title: "Au Quotidien Couleur", images: [Coiffeur] },
  }), []);

  // Chargement de la galerie avec timeout de sécurité
  useEffect(() => {
    if (galId && staticGalleries[`gal${galId}`]) {
      setGallery(staticGalleries[`gal${galId}`]);
      setIsLoading(true);

      // Simuler le chargement pendant 1.5 secondes
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
    console.error("Galerie non trouvée");
    window.location.pathname = "/gallerie";
    // Explicitly return undefined to satisfy linting/compile requirements
    return undefined;
  }, [galId, staticGalleries]);

  // Gestion de la navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Désactiver le scroll quand une image est sélectionnée
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  if (!gallery) {
    return (
      <div className="loading-overlay-gallery">
        <div className="loading-message-gallery">
          <div className="loading-spinner-gallery"/>
          <p>Chargement de la galerie...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Message de chargement pour toutes les galeries */}
      {isLoading && (
        <div className="loading-overlay-gallery">
          <div className="loading-message-gallery">
            <div className="loading-spinner-gallery"/>
            <p>Chargement de "{gallery.title}"...</p>
            <p className="loading-subtext">Veuillez patienter</p>
          </div>
        </div>
      )}

      <main id="singleGallery">
        <h1>{gallery.title}</h1>
        <ul>
          {gallery.images.map((image) => (
            <li key={image}>
              <button
                type="button"
                className="clickable-image-button"
                onClick={() => setSelectedImage(image)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedImage(image);
                  }
                }}
                aria-label={`Agrandir l'image de ${gallery.title}`}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <img
                  src={image}
                  alt={`${gallery.title}`}
                  className="clickable-image"
                  loading="lazy"
                />
              </button>
            </li>
          ))}
        </ul>
      </main>

      {/* Overlay pour l'image en grand */}
      {selectedImage && (
        <div 
          id="galleryContainer" 
          className="visible"
          role="dialog"
          aria-modal="true"
          aria-label="Image agrandie, cliquez sur l'image ou appuyez sur Échap pour fermer"
        >
          <div
            className="gallery-image-modal-content"
            role="presentation"
            aria-hidden="true"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", position: "relative" }}
          >
            <button
              type="button"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "block", maxWidth: "100%", maxHeight: "100vh" }}
              onClick={() => setSelectedImage(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                  setSelectedImage(null);
                }
              }}
              tabIndex={0}
              aria-label="Fermer l'image agrandie"
            >
              <img 
                src={selectedImage} 
                alt="Vue agrandie"
                style={{ display: "block", maxWidth: "100%", maxHeight: "100vh", cursor: "pointer" }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}