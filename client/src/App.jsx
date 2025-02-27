import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Accueil from "./components/Accueil";

// App.jsx modifié
// App.jsx
function App() {
  
  return (
   
    
    <div>
      <NavBar />
     
    
      <div >
        <Outlet /> {/* Contenu des pages */}
      </div>
      <Accueil />
      <Footer />
    </div>
   
  );
}



export default App;
