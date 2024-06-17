import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import PhotoService from './placeholder/photoexamples';

const Galeria: React.FC = () => {
    
    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        PhotoService.getImages().then(data => setImages(data));
    }, [])

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} />
    }

    const caption = (item) => {
        return (
            <React.Fragment>
                <div className="text-xl mb-2 font-bold">{item.title}</div>
                <p className="text-white">{item.alt}</p>
            </React.Fragment>
        );
    }

    return (
        <div className="card">
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }} 
                item={itemTemplate} thumbnail={thumbnailTemplate} thumbnailsPosition = 'right' caption={caption}/>
        </div>
    );
};

export default Galeria;
