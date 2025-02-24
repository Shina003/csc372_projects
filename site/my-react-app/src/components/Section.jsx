// src/components/Section.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

export const Section = ({ title, content, alignment }) => {
  return (
    <Container className="my-5">
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
  );
};