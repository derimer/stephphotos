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
      <nav id="mainNav" className={menuOpen ? "open" : ""}>
        <img src={Steph} alt="photosteph" id="logoImg" />
        <ul>
          <li><Link to="/" onClick={toggleMenu}><i className="fas fa-home"></i></Link></li>
          <li><Link to="/about" onClick={toggleMenu}><i className="fas fa-info-circle"></i></Link></li>
          <li><Link to="/gallerie" onClick={toggleMenu}><i className="fas fa-images"></i></Link></li>
          <li><Link to="/contact" onClick={toggleMenu}><i className="fas fa-envelope"></i></Link></li>
          <li><Link to="/mentionsLegales" onClick={toggleMenu}><i className="fas fa-gavel"></i></Link></li>
          <li><Link to="/login" onClick={toggleMenu}><i className="fas fa-user"></i></Link></li>
          <li><a href="https://www.instagram.com/stephanovalentinophoto/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
          <li><a href="https://www.facebook.com/steph.valentin?locale=fr_FR" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
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
