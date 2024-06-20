import Contact from "./components/contact/Contact";
import Galeria from "./components/gallery/Gallery";
import HomePage from "./components/home/Home";
import UploadImage from "./components/uploadImage/UploadImage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/galeria",
    element: <Galeria />,
  },
  {
    path: "/contacto",
    element: <Contact />,
  },
  {
    path: "/subirImagen",
    element: <UploadImage />,
  },
];
