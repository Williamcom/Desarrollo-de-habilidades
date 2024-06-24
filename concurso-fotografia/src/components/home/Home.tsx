import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { getData } from "../../firebase/config";
import "./HomePage.css"; // Asegúrate de importar el archivo CSS

const HomePage = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    getData().then((data) => {
      function comparacionAleatoria() {
        return Math.random() - 0.5;
      }
      data.sort(comparacionAleatoria);
      setImages(data.slice(0, 5));
    });
  }, []);

  const header = (
    <div className="p-grid p-justify-center p-align-center">
      <div className="p-col-12 p-md-8 p-lg-6">
        <Card
          title="Concurso de Fotografía ESCOM 2024"
          subTitle="Organizado por el grupo 8BM1"
        >
          <p className="p-mb-0">
            Participa en nuestro emocionante concurso de fotografía y muestra tu
            talento.
          </p>
        </Card>
      </div>
    </div>
  );

  const rules = (
    <div className="p-grid p-justify-center p-align-center p-mt-4">
      <div className="p-col-12 p-md-10">
        <Card title="Reglas del Concurso">
          <ul>
            <li>La participación es gratuita.</li>
            <li>Cada participante puede enviar fotos sin límite.</li>
            <li>
              Las fotos deben ser originales y no haber sido premiadas en otros
              concursos.
            </li>
            <li>
              La fecha límite para enviar las fotos es el 21 de Junio de 2024.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );

  const itemTemplate = (item) => {
    return (
      <img src={item.result} alt={item.description} className="gallery-image" />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.result}
        alt={item.description}
        className="gallery-thumbnail"
      />
    );
  };

  const caption = (item: any) => {
    return (
      <React.Fragment>
        <div className="text-xl mb-2 font-bold">{item.author}</div>
        <p className="text-white">{item.description}</p>
      </React.Fragment>
    );
  };

  const gallery = (
    <div className="card gallery-container">
      <Galleria
        value={images}
        numVisible={5}
        circular
        showThumbnails={false}
        showItemNavigators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        caption={caption}
        style={{ width: "500px", height: "400px" }}
      />
    </div>
  );

  return (
    <div className="flex flex-column align-items-center justify-content-center">
      {header}
      {gallery}
      {rules}
    </div>
  );
};

export default HomePage;
