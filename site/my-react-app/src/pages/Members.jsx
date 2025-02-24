import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { MemberCard } from '../components/MemberCard';
import { MemberModal } from '../components/MemberModal';
import membersData from '../data/members.json';

export const Members = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="display-4 text-center mb-5" style={{ color: '#333' }}>Our Members</h1>
      <Row className="justify-content-center">
        {membersData.map((member, index) => (
          <MemberCard 
            key={index}
            member={member} 
            onClick={handleMemberClick}
          />
        ))}
      </Row>
      <MemberModal 
        member={selectedMember}
        show={showModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
};