import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactType: 'general',
    message: ''
  });

  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const success = urlParams.get('success');
    if (message) {
      setResponseMessage(message);
      if (success === 'true') {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessages[name]) {
      setErrorMessages(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch('process_contact.php', {
        method: 'POST',
        body: formDataToSend,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setShowError(false);
        setResponseMessage(result.message);
        setErrorMessages({});
        setFormData({
          name: '',
          email: '',
          phone: '',
          contactType: 'general',
          message: ''
        });
        setValidated(false);
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setShowError(true);
        setResponseMessage(result.message);
        setErrorMessages(result.errors || {});
      }
    } catch (error) {
      console.error('Error:', error);
      setShowError(true);
      setResponseMessage('There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      {showSuccess && <div className="alert success">{responseMessage}</div>}
      {showError && (
        <div className="alert error">
          {responseMessage}
          {Object.keys(errorMessages).length > 0 && (
            <ul>
              {Object.values(errorMessages).map((msg, i) =>
                msg ? <li key={i}>{msg}</li> : null
              )}
            </ul>
          )}
        </div>
      )}

      <form
        className={`contact-form ${validated ? 'validated' : ''}`}
        onSubmit={handleSubmit}
        action="process_contact.php"
        method="post"
        encType="multipart/form-data"
        noValidate
      >
        <label>
          Name *
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errorMessages.name && <span className="error-text">{errorMessages.name}</span>}
        </label>

        <label>
          Email *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errorMessages.email && <span className="error-text">{errorMessages.email}</span>}
        </label>

        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errorMessages.phone && <span className="error-text">{errorMessages.phone}</span>}
        </label>

        <label>
          Reason for Contact *
          <select
            name="contactType"
            value={formData.contactType}
            onChange={handleChange}
            required
          >
            <option value="general">General Inquiry</option>
            <option value="support">Support</option>
            <option value="event">Event Information</option>
            <option value="membership">Membership</option>
            <option value="donation">Donation</option>
          </select>
          {errorMessages.contactType && <span className="error-text">{errorMessages.contactType}</span>}
        </label>

        <label>
          Message *
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errorMessages.message && <span className="error-text">{errorMessages.message}</span>}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="contact-alt">
        <h3>Other Ways to Reach Us</h3>
        <p><strong>Email:</strong> info@fountainbrothers.org</p>
        <p><strong>Phone:</strong> +1 111 111 1111</p>
        <p><strong>Address:</strong> Earth</p>
      </div>
    </div>
  );
};

export default Contact;
