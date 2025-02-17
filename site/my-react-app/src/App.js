import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Image,} from 'react-bootstrap';
import { useState } from 'react';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Nav className="mx-auto gap-4">
          <Nav.Link href="#">Success stories</Nav.Link>
          <Nav.Link href="#">Goals</Nav.Link>
          <Nav.Link href="#">Members</Nav.Link>
          <Nav.Link href="#">Events</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

const Header = () => {
  return(
    <Container className="mt-4 mb-5">
      <Row className="align-items-start">
        <Col md={8}>
          <h1 className="display-4">Fountain Brothers</h1>
          {/* Space for additional text */}
          <p className="lead mt-3">
            Your additional text can go here. This could be a tagline, brief description, or any other important information.
          </p>
        </Col>
        <Col md={4} className="text-end">
          <Image 
            src="/images/logoSite.jpg" 
            alt="website logo" 
            style={{ width: '300px', height: '300px' }}
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  )
}
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

  // Calculate which thumbnails to show
  const getVisibleThumbnails = () => {
    const start = Math.max(0, Math.min(currentIndex - 1, images.length - 4));
    return images.slice(start, start + 4);
  };

  return(
    <Container style={{ marginTop: '8rem' }}> 
      <Row className="mb-4">
        <Col className="position-relative px-5">
          <div style={{ 
            width: '100%', 
            height: '500px',
            backgroundColor: '#f8f9fa',
            position: 'relative'
          }}>
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
  )
}

const Section = ({ title, content, alignment }) => {
  return(
    <Container style={{ marginTop: '8rem' }}> 
      <div className={`text-${alignment}`}>
        <h2 className="display-4 mb-4 fw-normal">{title}</h2>
        <p className="lead" style={{ 
          maxWidth: '600px', 
          margin: alignment === 'end' ? 'auto 0 auto auto' : '0',
          textAlign: alignment
        }}>
          {content}
        </p>
      </div>
    </Container>
  )
}


const Footer = () => {
  return (
    <footer className="bg-light mt-5 py-4">
      <Container>
        <Row className="justify-content-center text-center">
          {/* Social Media Links */}
          <Col xs={12} className="mb-3">
            <div className="d-flex justify-content-center gap-4">
              <a href="#" className="text-secondary text-decoration-none">Twitter</a>
              <a href="#" className="text-secondary text-decoration-none">Instagram</a>
              <a href="#" className="text-secondary text-decoration-none">Facebook</a>
            </div>
          </Col>

          {/* Navigation Links */}
          <Col xs={12} className="mb-3">
            <div className="d-flex justify-content-center gap-4">
              <Nav.Link href="#" className="text-secondary">Success Stories</Nav.Link>
              <Nav.Link href="#" className="text-secondary">Goals</Nav.Link>
              <Nav.Link href="#" className="text-secondary">Members</Nav.Link>
              <Nav.Link href="#" className="text-secondary">Events</Nav.Link>
              <Nav.Link href="#" className="text-secondary">About</Nav.Link>
            </div>
          </Col>

          {/* Copyright */}
          <Col xs={12}>
            <p className="text-secondary mb-0">
              © {new Date().getFullYear()} Fountain Brothers
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

function App() {

  const missionContent = "At Fountain Brothers of Nigeria, we empower individuals and communities to drive sustainable transformation, and positive change. We achieve this by providing education, promoting self-awareness, and fostering economic opportunities that lift our people out of poverty.";
  
  const visionContent = "Our vision is to liberate our community from the shackles of poverty, unlocking a brighter future through education, self-awareness, and economic empowerment. We strive to build a society where every individual has equal access to opportunities, resources, and support, enabling them to reach their full potential.";

  return(
    
    <div className="bg-light">
      <Navigation />
      <Header />
      <ImageGallery />
      <Section title="Our Mission" content={missionContent} alignment="start" />
      <Section title="Our Vision" content={visionContent} alignment="end" />
      <Footer />
    </div>
  )
}

export default App;