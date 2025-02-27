import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hamburger from "../assets/images/hamburger.webp";
import Steph from "../assets/images/image-85.webp";
import Appareils from "../assets/images/image-109.jpg";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (
        menuOpen &&
        !e.target.closest("#mainNav") &&
        !e.target.closest("#menuToggle")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header id="mainHeader">
     
      <h1><strong>Stephanovalentinophoto</strong></h1>
     
      <nav id="mainNav" className={menuOpen ? "open" : ""}>
        <img src={Steph} alt="photosteph" id="logoImg" />
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Accueil</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>À propos</Link></li>
          <li><Link to="/gallerie" onClick={toggleMenu}>Galeries</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      </nav>

      {/* Afficher le hamburger seulement si le menu est fermé */}
      {!menuOpen && (
        <button type="button" id="menuToggle" className="hamburger" onClick={toggleMenu}>
          <img src={Hamburger} alt="Menu"  />
        </button>
      )}
    </header>
  );
}

export default NavBar;
