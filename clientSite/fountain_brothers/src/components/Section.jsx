import React from 'react';
import './Section.css';

const Section = ({ title, content, alignment }) => {
  return (
    <div className={`section-container align-${alignment}`}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Section;
