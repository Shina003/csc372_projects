import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const MemberModal = ({ member, show, onHide }) => {
  if (!member) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ backgroundColor: '#008000', color: 'white' }}>
        <Modal.Title>{member.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <img
            src={member.photo}
            alt={member.name}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'contain'
            }}
          />
        </div>
        <div style={{ whiteSpace: 'pre-line' }}>
          {member.bio}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={onHide}
          style={{ 
            backgroundColor: '#008000',
            borderColor: '#008000'
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};