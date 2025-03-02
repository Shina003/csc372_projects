// src/pages/Members.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Members = () => {
  
  useEffect(() => {
    // Load the Ajax scripts
    const scripts = [
      '/js/loadhtml.js',
      '/js/loadxml.js',
      '/js/loadjson.js',
      '/js/loadjquerry.js'
    ];
    
    const loadedScripts = [];
    
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      loadedScripts.push(script);
    });

    return () => {
      // Cleanup
      loadedScripts.forEach(script => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <h1 className="display-4 text-center mb-4">Our Members</h1>
      <p className="text-center mb-5">Meet the incredible people who make up Fountain Brothers of Nigeria.</p>
      
      {/* HTML Section */}
      <section className="mb-5">
        <h2>Core Leadership Team</h2>
        <p>Click the button below to load our core leadership team members using HTML.</p>
        <button id="load-html-members" className="btn btn-success mb-3">Load Leadership Team</button>
        <div id="html-members-container" className="member-container">
          {/* HTML Content will be loaded here */}
        </div>
      </section>
      
      {/* XML Section */}
      <section className="mb-5">
        <h2>Founding Members</h2>
        <p>Click the button below to load our founding members using XML.</p>
        <button id="load-xml-members" className="btn btn-success mb-3">Load Founding Members</button>
        <div id="xml-members-container" className="member-container">
          {/* XML Content will be loaded here */}
        </div>
      </section>
      
      {/* JSON Section */}
      <section className="mb-5">
        <h2>Board Members</h2>
        <p>Click the button below to load our board members using JSON.</p>
        <button id="load-json-members" className="btn btn-success mb-3">Load Board Members</button>
        <div id="json-members-container" className="member-container">
          {/* JSON Content will be loaded here */}
        </div>
      </section>
      
      {/* jQuery HTML Section */}
      <section className="mb-5">
        <h2>Technical Advisors</h2>
        <p>Click the button below to load our technical advisors using jQuery.</p>
        <button id="load-jquery-members" className="btn btn-success mb-3">Load Technical Advisors</button>
        <div id="jquery-members-container" className="member-container">
          {/* jQuery HTML Content will be loaded here */}
        </div>
      </section>
      
      {/* Bio Modal */}
      <div className="modal fade" id="bioModal" tabIndex="-1" aria-labelledby="bioModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title" id="bioModalLabel"></h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-4">
                <img id="bioModalImage" src="" alt="" className="img-fluid rounded mb-3" style={{ maxHeight: '300px' }} />
              </div>
              <p id="bioModalContent" className="bio-text"></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS */}
      <style>{`
        .members-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        
        .member-card {
          width: 300px;
          padding: 15px;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          text-align: center;
        }
        
        .member-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        
        .bio-text {
          white-space: pre-line;
        }
      `}</style>
    </Container>
  );
};