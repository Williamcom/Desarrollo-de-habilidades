import "./Cabecera.css";
import { Toolbar } from 'primereact/toolbar';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';  
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

const Cabecera = ( ) => {
    const startContent = (
        <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>
    );

    const endContent = (
        <div className="flex align-items-center gap-2">
            <Button icon="pi pi-image" aria-label="Filter" />
            <Button icon="pi pi-home" aria-label="Filter" />
        </div>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} end={endContent} className="bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
        </div>
    )
}

export default Cabecera