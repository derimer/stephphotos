import { Outlet } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Accueil from "./components/Accueil";

// App.jsx modifié
// App.jsx
function App() {
  return (
    <div className="app-container">
      <NavBar />
      <Accueil className="background-page" />
      
      <div className="content-layer">
        <Outlet /> {/* Contenu des pages */}
      </div>

      <Footer />
    </div>
  );
}



export default App;
