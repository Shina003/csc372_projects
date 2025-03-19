// src/components/MemberCard.jsx
//API USED HERE TO SCALE AND transform images.
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';

export const MemberCard = ({ member, onClick }) => {
  // Initialize Cloudinary directly in the component
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dwcw3dnhc'
    }
  });

  // Create a Cloudinary image using the cloudinaryId from the member object
  const getCloudinaryImage = () => {
    if (member.cloudinaryId) {
      return cld.image(member.cloudinaryId);
    }
    // Fallback to the original image path if no cloudinaryId is found
    return null;
  };

  // Get the Cloudinary image with transformations
  const myImage = getCloudinaryImage();

  if (myImage) {
    myImage
      // Use fill mode with 1:1 aspect ratio (square) for consistent cards
      // Focus on faces for better portrait crops
      .resize(fill().width(400).height(400).gravity(focusOn(FocusOn.face())))
      .delivery(format(auto()))
      .delivery(quality(auto()));
  }

  return (
    <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
      <Card 
        className="h-100 border-0 shadow-sm bg-white" 
        style={{ cursor: 'pointer' }}
        onClick={() => onClick(member)}
      >
        <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
          {myImage ? (
            <AdvancedImage 
              cldImg={myImage}
              alt={member.name}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center top' // focus on faces
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = member.photo;
              }}
            />
          ) : (
            <Card.Img 
              variant="top" 
              src={member.photo} 
              alt={member.name}
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
            />
          )}
        </div>
        <Card.Body className="text-center" style={{ backgroundColor: 'white' }}>
          <Card.Title 
            style={{ 
              color: '#008000',
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