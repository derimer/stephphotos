import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Accueil from "./components/Accueil";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet /> {/* Contenu des pages */}
      </div>
      <Accueil />
    </div>
  );
}

export default App;
