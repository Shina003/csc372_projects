import React from 'react';
import './MemberCard.css';

const MemberCard = ({ member, onClick }) => {
  return (
    <div className="member-card" onClick={() => onClick(member)}>
      <div className="image-wrapper">
        <img
          src={member.photo}
          alt={member.name}
          className="member-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/default.jpg'; // fallback if needed
          }}
        />
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
      </div>
    </div>
  );
};

export default MemberCard;
