import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema de PrimeReact que prefieras
import 'primereact/resources/primereact.min.css'; // Importa los estilos de PrimeReact

import { ProgressSpinner } from 'primereact/progressspinner';

const Loader: React.FC = () => {
    return (
        <div>
            <ProgressSpinner/>
            <h2>Cargando . . .</h2>
        </div>
    );
};

export default Loader;