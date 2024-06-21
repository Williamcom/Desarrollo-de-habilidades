import { Card } from "primereact/card";
import { getData } from "../../firebase/config";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { Image } from "primereact/image";

const Galeria: React.FC = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData().then((result) => {
      setData(result);
    });
  }, []);

  const header = (source) => {
    return <Image alt="Card" src={source} preview />;
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
      <div className="card flex justify-content-center">
        {data.map((item) => (
          <Card
            key={item.id}
            title={"Autor: " + item.author}
            subTitle={item.sentiments}
            header={header(item.result)}
            className="md:w-25rem shadow-8"
          >
            <p className="m-0">{item.description}</p>
          </Card>
        ))}
      </div>
    );
  }
};

export default Galeria;
