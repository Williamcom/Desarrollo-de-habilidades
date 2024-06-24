import { Card } from "primereact/card";
import { getData } from "../../firebase/config";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { Image } from "primereact/image";
import "./Gallery.css";
import { Chip } from "primereact/chip";

const Galeria: React.FC = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData().then((result) => {
      setData(result);
    });
  }, []);

  const header = (source: string) => {
    return (
      <div className="image-container">
        <Image alt="Card" src={source} preview />
      </div>
    );
  };

  const chipMapper = (sentiments: Array<string>) => {
    const chips: JSX.Element[] = [];
    sentiments.forEach((sentiment, index) => {
      chips.push(
        <Chip
          key={index}
          label={sentiment}
          className="p-mr-2 p-mb-2 m-1"
          icon=""
        />
      );
    });
    return chips;
  };

  if (data == null) {
    return (
      <div className="card flex justify-content-center align-content-center">
        <ProgressSpinner
          style={{ width: "100px", height: "100px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
    );
  } else {
    return (
      <div className="card flex flex-wrap justify-content-center gap-5">
        {data.map((item) => (
          <Card
            key={item.id}
            title={"Autor: " + item.author}
            subTitle={chipMapper(item.sentiments)}
            header={header(item.result)}
            className="md:w-25rem shadow-8 card-container"
          >
            <p className="m-0">{item.description}</p>
          </Card>
        ))}
      </div>
    );
  }
};

export default Galeria;
