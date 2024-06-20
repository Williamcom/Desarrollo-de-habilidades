import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import { ScrollPanel } from "primereact/scrollpanel";

import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Navbar";

/* Importamos los componentes */
import { AppRouter } from "./Router";

export default function App() {
  return (
    <Router>
      <div className="layout-main-container">
        <div className="layout-main">
          <NavBar />
          <ScrollPanel className="" style={{ width: "100%", height: "95vh" }}>
            <AppRouter />
          </ScrollPanel>
        </div>
      </div>
    </Router>
  );
}
