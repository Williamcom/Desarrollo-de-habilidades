import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import { classNames } from 'primereact/utils';
import './Carousel.css';
import { getData } from "../../firebase/config";

export default function Carousel() {
    const [images, setImages] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [isAutoPlayActive, setAutoPlayActive] = useState(true);
    const [isFullScreen, setFullScreen] = useState(false);
    
    const galleria = useRef(null)

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        getData().then(data => setImages(data));
        bindDocumentListeners();

        return () => unbindDocumentListeners();
    },[]);

    useEffect(() => {
        setAutoPlayActive(galleria.current.isAutoPlayActive())
    },[isAutoPlayActive]);

    const onItemChange = (event) => {
        setActiveIndex(event.index)
    }

    const toggleFullScreen = () => {
        if (isFullScreen) {
            closeFullScreen();
        }
        else {
            openFullScreen();
        }
    }

    const onFullScreenChange = () => {
        setFullScreen(prevState => !prevState )
    }

    const openFullScreen = () => {
        let elem = document.querySelector('.custom-galleria');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    const closeFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    const bindDocumentListeners = () => {
        document.addEventListener("fullscreenchange", onFullScreenChange);
        document.addEventListener("mozfullscreenchange", onFullScreenChange);
        document.addEventListener("webkitfullscreenchange", onFullScreenChange);
        document.addEventListener("msfullscreenchange", onFullScreenChange);
    }

    const unbindDocumentListeners = () => {
        document.removeEventListener("fullscreenchange", onFullScreenChange);
        document.removeEventListener("mozfullscreenchange", onFullScreenChange);
        document.removeEventListener("webkitfullscreenchange", onFullScreenChange);
        document.removeEventListener("msfullscreenchange", onFullScreenChange);
    }

    const thumbnailTemplate = (item) => {
        return (
            <div className="grid grid-nogutter justify-content-center">
                
                <img src={item.result} alt={item.description} style={{ display: 'block' }} />
            </div>
        );
    }

    const itemTemplate = (item) => {
        if (isFullScreen) {
            return <img src={item.result} alt={item.description} />
        }

        return <img src={item.result} alt={item.description} style={{ width: '100%', display: 'block' }} />
    }

    const renderFooter = () => {
        let autoPlayClassName = classNames('pi', {
            'pi-play': !isAutoPlayActive,
            'pi-pause': isAutoPlayActive
        });

        let fullScreenClassName = classNames('pi', {
            'pi-window-maximize': !isFullScreen,
            'pi-window-minimize': isFullScreen
        });

        return (
            <div className="custom-galleria-footer mt-3">
                <div className='flex justify-content-between w-full'>
                    {images && (
                        <span className="title-container">
                            <span>{activeIndex + 1}/{images.length}</span>
                        </span>
                    )}
                    <Button icon={fullScreenClassName} onClick={() => toggleFullScreen()} className="fullscreen-button align-items-right" />
                </div>
               
            </div>
        );
    }

    const footer = renderFooter();
    const galleriaClassName = classNames('custom-galleria', {
        'fullscreen': isFullScreen
    });
        return (
            <div className="card galleria-demo flex flex-column align-items-center justify-content-center">
                {images && (
                    <div className='text-xl font-italic font-bold'>Autor: {images[activeIndex].author}</div>
                )}
                <Galleria ref={galleria} value={images} activeIndex={activeIndex} onItemChange={onItemChange}
                    showThumbnails={showThumbnails} showItemNavigators showItemNavigatorsOnHover
                    numVisible={5} circular autoPlay transitionInterval={3000} responsiveOptions={responsiveOptions}
                    item={itemTemplate} thumbnail={thumbnailTemplate} footer={footer}
                    style={{ width: '700px' }} className={galleriaClassName} />
                {images && (
                    <div >Descripción: {images[activeIndex].description}</div>
                )}
            </div>
        )
      
}
