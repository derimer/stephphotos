import { Link ,useLocation} from "react-router-dom";

import Gerbier from "../assets/images/image-2.webp";
import Pecheurs from "../assets/images/image-1.webp";
import Bouteilles from "../assets/images/image-19.webp";
import Acteur from "../assets/images/image-54.webp";
import Julie from "../assets/images/image-87.webp";
import Hotel from "../assets/images/image-25.webp";
import Lilly from "../assets/images/image-3.webp";
import Lyon from "../assets/images/image-78.webp";
import Rmc from "../assets/images/image-97.jpg";
import Vintage from "../assets/images/image-96.webp";
import Coiffeur from "../assets/images/image-80.webp";
import Audray8 from "../assets/images/audray8.jpg";

const galleriesConfig = [
  { id: 1, type: 'nb', image: Gerbier, title: 'Voyages N&B' },
  { id: 3, type: 'nb', image: Pecheurs, title: 'sublime N&B' },
  { id: 5, type: 'nb', image: Acteur, title: 'Portrait N&B' },
  { id: 7, type: 'nb', image: Lilly, title: 'Charme N&B' },
  { id: 9, type: 'nb', image: Lyon, title: 'Evenements n&b' },
  { id: 11, type: 'nb', image: Vintage, title: 'Au quotidien n&b' },
  { id: 2, type: 'color', image: Hotel, title: 'Voyages couleur' },
  { id: 4, type: 'color', image: Bouteilles, title: 'sublime Couleur' },
  { id: 6, type: 'color', image: Audray8, title: 'Portrait couleur' },
  { id: 8, type: 'color', image: Julie, title: 'Charme Couleur' },
  { id: 10, type: 'color', image: Rmc, title: 'Evenements Couleur' },
  { id: 12, type: 'color', image: Coiffeur, title: 'Au quotidien Couleur' },
];
export default function Gallerie() {
  const location = useLocation();
  const filteredGalleries = galleriesConfig.filter(gallery => {
    if (location.pathname === '/galleries/nb') {
      return gallery.type === 'nb';
    }
    if (location.pathname === '/galleries/color') {
      return gallery.type === 'color';
    }
    return true; // Affiche tout si pas de filtre
  });
  return (
    <section id="pageContentG">
    <main id="gallerie1">
      <h1>Galeries</h1>
      <ul id="galeries">
        {filteredGalleries.map((gallery) => (
          <li key={gallery.id} className="image-container">
            <Link to={`/gallerie/singleGallery?id=${gallery.id}`}>
              <img 
                src={gallery.image} 
                alt={gallery.title} 
                loading="lazy"
                decoding="async"
              />
              <h2>{gallery.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </section>
);
}

