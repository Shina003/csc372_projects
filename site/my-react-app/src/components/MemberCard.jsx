// src/components/MemberCard.jsx
import React from 'react';
import { Card, Col } from 'react-bootstrap';

export const MemberCard = ({ member, onClick }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
      <Card 
        className="h-100 border-0 shadow-sm bg-white" 
        style={{ cursor: 'pointer' }}
        onClick={() => onClick(member)}
      >
        <Card.Img 
          variant="top" 
          src={member.photo} 
          alt={member.name}
          style={{ 
            height: '300px',
            objectFit: 'cover'
          }}
        />
        <Card.Body className="text-center" style={{ backgroundColor: 'white' }}>
          <Card.Title 
            style={{ 
              color: '##008000',
              fontSize: '1.2rem',
              fontWeight: '500'
            }}
          >
            {member.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};
