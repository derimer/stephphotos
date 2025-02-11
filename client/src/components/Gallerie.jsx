import { Link } from "react-router-dom";
import Gerbier from "../assets/images/image-2.webp";
import Pecheurs from "../assets/images/image-1.webp";
import Bouteilles from "../assets/images/image-19.webp";
import Acteur from "../assets/images/image-54.webp";
import Julie from "../assets/images/image-87.webp";
import Hotel from "../assets/images/image-25.webp";
import Audray from "../assets/images/image-42.webp";
import Lilly from "../assets/images/image-3.webp";
import Lyon from "../assets/images/image-78.webp";
import Rmc from "../assets/images/image-97.jpg";

export default function Gallerie() {
  return (
    <section id="pageContentG">
      <main id="gallerie1">
        <h1>Galeries</h1>
        <ul id="galeries">
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=1">
              <img src={Gerbier} alt="mont gerbier" />
              <h2>Voyages n&b</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=2">
              <img src={Hotel} alt="" />
              <h2>Voyages couleur</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=3">
              <img src={Pecheurs} alt="pecheurs" />
              <h2> sublime N&B</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=4">
              <img src={Bouteilles} alt="bouteilles" />
              <h2>sublime Couleur</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=5">
              <img src={Acteur} alt="Acteur" />
              <h2>Portrait n&b</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=6">
              <img src={Audray} alt="Audray" />
              <h2>Portrait couleur</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=7">
              <img src={Lilly} alt="Lilly" />
              <h2>Charme n&b</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=8">
              <img src={Julie} alt="Julie" />
              <h2>Charme Couleur</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=9">
              <img src={Lyon} alt="Lyon" />
              <h2>Evenements n&b</h2>
            </Link>
          </li>
          <li className="image-container">
            <Link to="/gallerie/singleGallery?id=10">
              <img src={Rmc} alt="rmc" />
              <h2>Evenements Couleur</h2>
            </Link>
          </li>
        </ul>
      </main>
    </section>
  );
}
