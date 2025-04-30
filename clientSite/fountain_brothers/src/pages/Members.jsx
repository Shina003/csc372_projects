// src/pages/Members.jsx
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import MemberCard from '../components/MemberCard';
import MemberModal from '../components/MemberModal';
import './Members.css';

const Members = () => {
  const [membersData, setMembersData] = useState([]);    // loaded via XHR → XML
  const [htmlContent, setHtmlContent] = useState('');    // loaded via jQuery AJAX → HTML
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // fetch & parse members.xml
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/data/members.xml', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const xml = xhr.responseXML;
          const nodes = Array.from(xml.getElementsByTagName('member'));
          const parsed = nodes.map(node => ({
            name:  node.getElementsByTagName('name')[0].textContent,
            photo: node.getElementsByTagName('photo')[0].textContent,
            bio:   node.getElementsByTagName('bio')[0].textContent.trim()
          }));
          setMembersData(parsed);
        } else {
          console.error('XML load failed', xhr.status);
        }
      }
    };
    xhr.send();
  }, []);

  // jQuery AJAX → fetch an HTML fragment
  useEffect(() => {
    $.ajax({
      url: '/data/members.html',  
      method: 'GET',
      dataType: 'html',
      success(data) {
        setHtmlContent(data);
      },
      error() {
        setHtmlContent('<p>Error loading members.</p>');
      }
    });
  }, []);

  const handleMemberClick = member => {
    setSelectedMember(member);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="members-container">
      <h1 className="members-title">Our Members</h1>

      {/* GRID RENDERED FROM members.xml */}
      <div className="members-grid">
        {membersData.map((m, idx) => (
          <MemberCard
            key={idx}
            member={m}
            onClick={() => handleMemberClick(m)}
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
