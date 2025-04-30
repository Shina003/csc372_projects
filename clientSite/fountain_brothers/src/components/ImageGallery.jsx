import React, { useState, useEffect } from 'react';
import $ from 'jquery';
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

  useEffect(() => {
    // Update all thumbnails at once
    $('.thumbnail')
      .css({ width: '80px', opacity: 0.6 })
      .removeClass('active')
      .filter(`[src="${images[currentIndex]}"]`)
      .css({ opacity: 1 })
      .addClass('active');

    // Animate the main image fade-in
    $('.main-image').css({ opacity: 0 }).animate({ opacity: 1 }, 400);
  }, [currentIndex]);

  useEffect(() => {
    // changing iages with jQuery
    $('.gallery')
      .on('click', '.nav-button.left', () =>
        setCurrentIndex(i => (i === 0 ? images.length - 1 : i - 1))
      )
      .on('click', '.nav-button.right', () =>
        setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1))
      )
      .on('click', '.thumbnail', function() {
        setCurrentIndex(images.indexOf($(this).attr('src')));
      });
  }, []);

  const getVisibleThumbnails = () => {
    return images;
  };

  return (
    <div className="gallery">
      <div className="main-image-wrapper">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="main-image"
        />
        <button className="nav-button left">
          <span>&#x25C0;</span>
        </button>
        <button className="nav-button right">
          <span>&#x25B6;</span>
        </button>
      </div>

      <div className="thumbnail-row">
        {getVisibleThumbnails().map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
