import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = () => {
  const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(current => current === 0 ? images.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrentIndex(current => current === images.length - 1 ? 0 : current + 1);
  };

  const getVisibleThumbnails = () => {
    const start = Math.max(0, Math.min(currentIndex - 1, images.length - 4));
    return images.slice(start, start + 4);
  };

  return (
    <div className="gallery">
      <div className="main-image-wrapper">
        <img 
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1}`} 
          className="main-image"
        />
        <button className="nav-button left" onClick={handlePrevious}><span>&#x25C0;</span> {/* ◀ for left */}</button>
        <button className="nav-button right" onClick={handleNext}><span>&#x25B6;</span> {/* ▶ for right */}</button>
      </div>

      <div className="thumbnail-row">
        {getVisibleThumbnails().map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${images[currentIndex] === image ? 'active' : ''}`}
            onClick={() => setCurrentIndex(images.indexOf(image))}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
