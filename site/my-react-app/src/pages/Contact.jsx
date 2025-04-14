// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

export const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactType: 'general',
    message: ''
  });
  
  // Form submission and validation states
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error message when field is edited
    if (errorMessages[name]) {
      setErrorMessages({
        ...errorMessages,
        [name]: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Client-side form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    try {
      // Send form data to PHP backend for server-side validation
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch('process_contact.php', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      
      if (result.success) {
        // Show success message and reset form
        setShowSuccess(true);
        setShowError(false);
        setErrorMessages({});
        setFormData({
          name: '',
          email: '',
          phone: '',
          contactType: 'general',
          message: ''
        });
        setValidated(false);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        // Show error messages from server-side validation
        setShowError(true);
        setErrorMessages(result.errors || {});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="display-4 text-center mb-4" style={{ color: '#333' }}>Contact Us</h1>
          
          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}
          
          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              {Object.keys(errorMessages).length > 0 ? (
                <ul className="mb-0 pl-3">
                  {Object.values(errorMessages).map((message, index) => (
                    message && <li key={index}>{message}</li>
                  ))}
                </ul>
              ) : (
                "There was an error sending your message. Please try again later."
              )}
            </Alert>
          )}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit} action="process_contact.php" method="post">
            <Form.Group className="mb-3" controlId="contactName">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                isInvalid={!!errorMessages.name}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.name || "Please provide your name."}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="contactEmail">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email address"
                isInvalid={!!errorMessages.email}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.email || "Please provide a valid email address."}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="contactPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number (optional)"
                isInvalid={!!errorMessages.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.phone}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="contactType">
              <Form.Label>Reason for Contact <span className="text-danger">*</span></Form.Label>
              <Form.Select
                name="contactType"
                value={formData.contactType}
                onChange={handleChange}
                required
                isInvalid={!!errorMessages.contactType}
              >
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="event">Event Information</option>
                <option value="membership">Membership</option>
                <option value="donation">Donation</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errorMessages.contactType || "Please select a reason for contact."}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="contactMessage">
              <Form.Label>Message <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                style={{ height: '150px' }}
                isInvalid={!!errorMessages.message}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.message || "Please provide a message."}
              </Form.Control.Feedback>
            </Form.Group>
            
            <div className="d-grid gap-2">
              <Button 
                type="submit" 
                style={{ 
                  backgroundColor: '#008000',
                  borderColor: '#008000'
                }}
                className="py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      
      <Row className="mt-5 justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center">
            <h3 className="mb-3">Other Ways to Reach Us</h3>
            <p className="mb-2">
              <strong>Email:</strong> info@fountainbrothers.org
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +234 123 456 7890
            </p>
            <p>
              <strong>Address:</strong> Egbeda, Lagos State, Nigeria
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};