import { Link } from "react-router-dom";
import Gerbier from "../assets/images/image-2.jpg";
import Pecheurs from "../assets/images/image-1.jpg";
import Bouteilles from "../assets/images/image-19.jpg";
import Acteur from "../assets/images/image-54.jpg";

export default function Gallerie() {
  return (
    <section id="pageContent">
      <main id="gallerie1">
        <h1>Galeries</h1>
        <ul id="galeries">
          <li>
            <Link to="/gallerie/singleGallery?id=gal1">
              <h2>PAYSAGES</h2>
              <img src={Gerbier} alt="mont gerbier" />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquam, est saepe? Pariatur consequuntur maxime architecto
                cupiditate, rem quisquam facere. Optio quo fuga iste. Laborum,
                voluptates sequi deserunt quisquam temporibus harum.
              </p>
            </Link>
          </li>
          <li>
            <Link to="/gallerie/singleGallery?id=gal2">
              <h2>N&B</h2>
              <img src={Pecheurs} alt="pecheurs" />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquam, est saepe? Pariatur consequuntur maxime architecto
                cupiditate, rem quisquam facere. Optio quo fuga iste. Laborum,
                voluptates sequi deserunt quisquam temporibus harum.
              </p>
            </Link>
          </li>
          <li>
            <Link to="/gallerie/singleGallery?id=gal3">
              <h2>Couleurs</h2>
              <img src={Bouteilles} alt="bouteilles" />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquam, est saepe? Pariatur consequuntur maxime architecto
                cupiditate, rem quisquam facere. Optio quo fuga iste. Laborum,
                voluptates sequi deserunt quisquam temporibus harum.
              </p>
            </Link>
          </li>
          <li>
            <Link to="/gallerie/singleGallery?id=gal4">
              <h2>Portrait&charme</h2>
              <img src={Acteur} alt="Acteur" />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquam, est saepe? Pariatur consequuntur maxime architecto
                cupiditate, rem quisquam facere. Optio quo fuga iste. Laborum,
                voluptates sequi deserunt quisquam temporibus harum.
              </p>
            </Link>
          </li>
        </ul>
      </main>
    </section>
  );
}