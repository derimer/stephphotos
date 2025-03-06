// src/components/Accueil.js
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Isabelle from "../assets/images/image-98.webp";
// Assuming you have a CSS file for styles

function Accueil() {
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const location = useLocation();

  const localImages = [
    {
      filename: Isabelle,
      name: "THERMES",
      author: "RICOH GR",
      exposure: "800 ASA - f/8 ",
    },
  ];

  const normalizeImageUrl = (filename) => {
    if (!filename) return "";
    if (filename.startsWith("http")) return filename;
    const cleanFilename = filename.replace(/^\/uploads\//, "");
    return `${import.meta.env.VITE_API_URL}/uploads/${cleanFilename}?q=80&auto=format&fit=crop&w=800`;
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/accueil`);
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        const normalizedImages = data.map((image) => ({
          ...image,
          filename: normalizeImageUrl(image.filename),
        }));

        const allImages = localImages.concat(normalizedImages);
        setImages(allImages);
      } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
        setImages(localImages);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const chosenImage = images[Math.floor(Math.random() * images.length)];
      setRandomImage(chosenImage);
    }
  }, [location, images]);

  useEffect(() => {
    const intervalDuration = window.innerWidth <= 445 ? 60000 : 8000;

    const interval = setInterval(() => {
      if (images.length > 0) {
        const chosenImage = images[Math.floor(Math.random() * images.length)];
        setRandomImage(chosenImage);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section
      id="pageContent"
      key={randomImage?.filename}
      className="home"
      style={{
        backgroundImage: randomImage ? `url(${randomImage.filename})` : "none",
        position: "relative",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "fadeIn 2s linear",
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
