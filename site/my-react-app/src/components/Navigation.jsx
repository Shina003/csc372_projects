import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

export const Navigation = () => {
  return (
    <Navbar style={{ backgroundColor: '#008000' }} expand="lg" sticky="top">
      <Container fluid className="position-relative">
        <Navbar.Brand as={Link} to="/" className="d-lg-flex mx-auto mx-lg-0">
          <Image 
            src="/images/logoSite.jpg" 
            alt="website logo" 
            style={{ width: '60px', height: '60px' }}
            className="img-fluid"
          />
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="border-0"
          style={{ 
            position: 'fixed',
            top: '15px',
            right: '15px',
            zIndex: 1030,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            outline: 'none'
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav" className="slide-in">
          <Nav className="mx-auto gap-4 flex-column flex-lg-row">
          <Nav.Link as={Link} to="/home" className="text-white text-center text-lg-start">Home</Nav.Link>
            <Nav.Link as={Link} to="/members" className="text-white text-center text-lg-start">Members</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white text-center text-lg-start">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};