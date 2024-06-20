import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { storage } from "../../firebase/config";
import { Button } from "primereact/button";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Galeria: React.FC = () => {
  const [images, setImages] = useState(null);

  const getImages = () => {
    let imagesUrls = [];
    const listRef = ref(storage, "");
    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef)
            .then((url) => {
              console.log(url);
              imagesUrls.push(url);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    setImages(imagesUrls);
  };

  const see = () => {
    console.log(images);
  };

  return (
    <div className="card">
      <Button onClick={getImages}>Imagenes</Button>
      <Button onClick={see}>Ver imagenes</Button>
    </div>
  );
};

export default Galeria;
