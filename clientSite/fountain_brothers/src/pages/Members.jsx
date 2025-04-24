import React, { useState } from 'react';
import MemberCard from '../components/MemberCard';
import MemberModal from '../components/MemberModal';
import membersData from '../../public/data/members.json';
import './Members.css';

const Members = () => {
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
    <div className="members-container">
      <h1 className="members-title">Our Members</h1>
      <div className="members-grid">
        {membersData.map((member, index) => (
          <MemberCard
            key={index}
            member={member}
            onClick={handleMemberClick}
          />
        ))}
      </div>
      <MemberModal
        member={selectedMember}
        show={showModal}
        onHide={handleCloseModal}
      />
    </div>
  );
};

export default Members;
