import React from 'react';
import './MemberModal.css';

const MemberModal = ({ member, show, onHide }) => {
  if (!show || !member) return null;

  return (
    <div className="modal-backdrop" onClick={onHide}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{member.name}</h2>
          <button className="modal-close" onClick={onHide}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-image">
            <img src={member.photo} alt={member.name} />
          </div>
          <p className="modal-bio">{member.bio}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onHide}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
