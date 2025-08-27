import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "../assets/images/hamburger.webp";
import Steph from "../assets/images/image-85.webp";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleGalleryClick = async (e) => {
    e.preventDefault();    
    setIsLoading(true);
    setMenuOpen(false);
    
    try {
      // Précharge le composant Galerie
      await import('./Gallerie');
      
      // Navigue une fois le composant chargé
      navigate("/gallerie");
      
      // Donne un peu de temps pour l'affichage
      setTimeout(() => {
        setIsLoading(false);
        // console.log("Chargement terminé");
      }, 1000);
    } catch (error) {
      console.error("Erreur:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (menuOpen && !e.target.closest("#mainNav") && !e.target.closest("#menuToggle")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Toast de chargement */}
      {isLoading && (
        <div className="loading-toast">
          <div className="toast-spinner"/>
          <span>Chargement des galeries...</span>
        </div>
      )}

      <header id="mainHeader">
        <h1><strong>Stephanovalentinophoto</strong></h1>
        <img src={Steph} alt="photosteph" id="logoImg" />
        <nav id="mainNav" className={menuOpen ? "open" : ""}>
          <ul>
            <li><Link to="/" onClick={toggleMenu} aria-label="Accueil"><i className="fas fa-home" /></Link></li>
            <li><Link to="/about" onClick={toggleMenu} aria-label="À propos"><i className="fas fa-info-circle" /></Link></li>
            <li>
              <a href="/gallerie" onClick={handleGalleryClick} aria-label="Galeries">
                <i className="fas fa-images" />
              </a>
            </li>
            <li><Link to="/contact" onClick={toggleMenu} aria-label="Contact"><i className="fas fa-envelope" /></Link></li>
            <li><Link to="/mentionsLegales" onClick={toggleMenu} aria-label="Mentions légales"><i className="fas fa-gavel" /></Link></li>
            <li><Link to="/login" onClick={toggleMenu} aria-label="Login"><i className="fas fa-user" /></Link></li>
            <li><Link to="/testimonials" onClick={toggleMenu} aria-label="Testimonials"><i className="fas fa-star" /></Link></li>
            <li><a href="https://www.instagram.com/stephanovalentinophoto/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a></li>
          </ul>
        </nav>

        {!menuOpen && (
          <button type="button" id="menuToggle" className="hamburger" onClick={toggleMenu}>
            <img src={Hamburger} alt="Menu" />
          </button>
        )}
      </header>
    </>
  );
}

export default NavBar;