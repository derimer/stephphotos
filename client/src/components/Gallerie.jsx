import { Link } from "react-router-dom";
import Gerbier from "../assets/images/image-2.webp";
import Pecheurs from "../assets/images/image-1.webp";
import Bouteilles from "../assets/images/image-19.webp";
import Acteur from "../assets/images/image-54.webp";

export default function Gallerie() {
  return (
    <section id="pageContentG">
      <main id="gallerie1">
        <h1>Galeries</h1>
        <ul id="galeries">
          <li>
            <Link to="/gallerie/singleGallery?id=1">
              <img src={Gerbier} alt="mont gerbier" />
              <h2>Voyages</h2>
            </Link>
          </li>
          <li>
            <Link to="/gallerie/singleGallery?id=2">
              <img src={Pecheurs} alt="pecheurs" />
              <h2>N&B</h2>
            </Link>
          </li>
          <li>
            <Link to="/gallerie/singleGallery?id=3">
              <img src={Bouteilles} alt="bouteilles" />
              <h2>Couleurs</h2>
            </Link>
          </li>
          <li>
            <Link to="/gallerie/singleGallery?id=4">
              <img src={Acteur} alt="Acteur" />
              <h2>Portrait&charme</h2>
            </Link>
          </li>
        </ul>
      </main>
    </section>
  );
}
