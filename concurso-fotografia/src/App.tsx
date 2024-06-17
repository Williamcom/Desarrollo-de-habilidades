import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import NavBar from "./Navbar";
import Loader from "./components/statics/Loader";

/* Importamos los componentes */
import { Suspense } from "react";
import { AppRouter } from "./Router";


export default function App() {
    return (
        <div className="App">
            <NavBar />
            <div className="content">
                <Router>
                  <Suspense fallback={<Loader/>}>
                    <AppRouter/>
                  </Suspense>
                </Router>
            </div>
        </div>
    );
}