import React from 'react';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';

const HomePage = () => {
    const photos = [
        { src: '/Untitled.jpeg', alt: 'Photo 1' },
        { src: 'path/to/photo2.jpg', alt: 'Photo 2' },
        // Add more photos as needed
    ];

    const header = (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-12 p-md-8 p-lg-6">
                <Card title="Concurso de Fotografía ESCOM 2024" subTitle="Organizado por el grupo 8BM1">
                    <p className="p-mb-0">Participa en nuestro emocionante concurso de fotografía y muestra tu talento.</p>
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
                        <li>Las fotos deben ser originales y no haber sido premiadas en otros concursos.</li>
                        <li>La fecha límite para enviar las fotos es el 21 de Junio de 2024.</li>
                    </ul>
                </Card>
            </div>
        </div>
    );

    const gallery = (
        <div className="p-grid p-justify-center p-align-center p-mt-4">
            <div className="p-col-12 p-md-10">
                <Card title="">
                    <Galleria value={photos} showThumbnails showItemNavigators autoPlay transitionInterval={3000} />
                </Card>
            </div>
        </div>
    );

    return (
        <div>
            {header}
            {rules}
            {gallery}
        </div>
    );
};

export default HomePage;
