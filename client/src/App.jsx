import { Outlet } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Accueil from "./components/Accueil";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Accueil />
      
      <Footer />
    </>
  );
}
export default App;
