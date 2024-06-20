import React from "react";

import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Inicio",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Galería",
      icon: "pi pi-fw pi-images",
      command: () => {
        navigate("/galeria");
      },
    },
    {
      label: "Contacto",
      icon: "pi pi-fw pi-envelope",
      command: () => {
        navigate("/contacto");
      },
    },
  ];

  return (
    <div>
      <Menubar model={items}></Menubar>
    </div>
  );
};

export default NavBar;
