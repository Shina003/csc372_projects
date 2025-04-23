import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#008000' }} className="py-4">
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={12} className="mb-3">
            <div className="d-flex justify-content-center gap-4">
              <a href="#" className="text-white text-decoration-none">Twitter</a>
              <a href="#" className="text-white text-decoration-none">Instagram</a>
              <a href="#" className="text-white text-decoration-none">Facebook</a>
            </div>
          </Col>

          <Col xs={12} className="mb-3">
            <div className="d-flex justify-content-center gap-4">
            <Nav.Link as={Link} to="/home" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/members" className="text-white">Members</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-white">About</Nav.Link>
            </div>
          </Col>

          <Col xs={12}>
            <p className="text-white mb-0">
              © {new Date().getFullYear()} Fountain Brothers
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};