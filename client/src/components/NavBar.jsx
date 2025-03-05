import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hamburger from "../assets/images/hamburger.webp";
import Steph from "../assets/images/image-85.webp";

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
      <img src={Steph} alt="photosteph" id="logoImg" />
      <nav id="mainNav" className={menuOpen ? "open" : ""}>
        <ul>
          <li><Link to="/" onClick={toggleMenu} aria-label="Accueil"><i className="fas fa-home" /></Link></li>
          <li><Link to="/about" onClick={toggleMenu} aria-label="À propos"><i className="fas fa-info-circle" /></Link></li>
          <li><Link to="/gallerie" onClick={toggleMenu} aria-label="Galeries"><i className="fas fa-images" /></Link></li>
          <li><Link to="/contact" onClick={toggleMenu} aria-label="Contact"><i className="fas fa-envelope" /></Link></li>
          <li><Link to="/mentionsLegales" onClick={toggleMenu} aria-label="Mentions légales"><i className="fas fa-gavel" /></Link></li>
          <li><Link to="/login" onClick={toggleMenu} aria-label="Login"><i className="fas fa-user" /></Link></li>
          <li><a href="https://www.instagram.com/stephanovalentinophoto/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a></li>
         
        </ul>
      </nav>

      {!menuOpen && (
        <button type="button" id="menuToggle" className="hamburger" onClick={toggleMenu}>
          <img src={Hamburger} alt="Menu" />
        </button>
      )}
    </header>
  );
}

export default NavBar;
