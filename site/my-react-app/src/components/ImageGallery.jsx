import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const ImageGallery = () => {
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
    <Container style={{ marginTop: '8rem' }}> 
      <Row className="mb-4">
        <Col className="position-relative px-5">
          <div style={{ width: '100%', height: '500px', position: 'relative' }}>
            <Image 
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
            
            <button 
              className="position-absolute top-50 start-0 translate-middle-y bg-white rounded-circle p-2 border-0 ms-3"
              onClick={handlePrevious}
            >
              <span>←</span>
            </button>

            <button 
              className="position-absolute top-50 end-0 translate-middle-y bg-white rounded-circle p-2 border-0 me-3"
              onClick={handleNext}
            >
              <span>→</span>
            </button>
          </div>
        </Col>
      </Row>

      <Row className="g-3">
        {getVisibleThumbnails().map((image, index) => (
          <Col md={3} key={index}>
            <Image 
              src={image}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                cursor: 'pointer',
                opacity: images[currentIndex] === image ? 1 : 0.6
              }}
              onClick={() => setCurrentIndex(images.indexOf(image))}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};