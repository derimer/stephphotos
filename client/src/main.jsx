import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Gallerie from "./components/Gallerie";
import SingleGallery from "./components/SingleGallerie";
import Contact from "./components/Contact";
import Merci from "./components/Merci";
import About from "./components/About";
import App from "./App";
import Admin from "./components/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/gallerie", element: <Gallerie /> },
      { path: "/gallerie/singleGallery", element: <SingleGallery /> },
      { path: "/contact", element: <Contact /> },
      { path: "/merci", element: <Merci /> },
      { path: "/about", element: <About /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);