import React from "react";
import Home from "./home/Home";

export { Home }

export const Gallery = React.lazy(() => import('./gallery/Gallery')) 
export const Contact = React.lazy(() => import('./contact/Contact')) 
