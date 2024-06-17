import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema de PrimeReact que prefieras
import 'primereact/resources/primereact.min.css'; // Importa los estilos de PrimeReact
import 'primeicons/primeicons.css'; // Importa los íconos de PrimeIcons
import './styles.css'; // Importa tus estilos personalizados

import { Menubar } from 'primereact/menubar';

const NavBar: React.FC = () => {
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            command: () => { window.location.href = "/" }
        },
        {
            label: 'Galería',
            icon: 'pi pi-fw pi-images',
            command: () => { window.location.href = "galeria" }
        },
        {
            label: 'Contacto',
            icon: 'pi pi-fw pi-envelope',
            command: () => { window.location.href = "contacto" }
        }
    ];


    return (
        <div className="custom-menubar-container">
            <Menubar model={items} className="custom-menubar">
                
            </Menubar>
        </div>
    );
};

export default NavBar;
