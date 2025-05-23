import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessages[name]) {
      setErrorMessages(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (formData.phone && !/^\+?[0-9\-() ]{7,}$/.test(formData.phone)) {
      errors.phone = 'Enter a valid phone number.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      setResponseMessage('Please fix the errors below.');
      setShowError(true);
      setValidated(true);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    // Simulate submission delay
    setTimeout(() => {
      setShowSuccess(true);
      setResponseMessage('Your message has been sent successfully!');
      setErrorMessages({});
      setFormData({ name: '', email: '', phone: '', contactType: 'general', message: '' });
      setValidated(false);
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      {showSuccess && <div className="alert success">{responseMessage}</div>}
      {showError && <div className="alert error">{responseMessage}</div>}

      <form
        className={`contact-form ${validated ? 'validated' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="form-group">
          Name *
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            className={errorMessages.name ? 'invalid' : ''}
            required
          />
          {errorMessages.name && <span className="error-text">{errorMessages.name}</span>}
        </label>

        <label className="form-group">
          Email *
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errorMessages.email ? 'invalid' : ''}
            required
          />
          {errorMessages.email && <span className="error-text">{errorMessages.email}</span>}
        </label>

        <label className="form-group">
          Phone
          <input
            type="tel"
            name="phone"
            placeholder="(555) 123-4567 (optional)"
            value={formData.phone}
            onChange={handleChange}
            className={errorMessages.phone ? 'invalid' : ''}
          />
          {errorMessages.phone && <span className="error-text">{errorMessages.phone}</span>}
        </label>

        <label className="form-group">
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
        </label>

        <label className="form-group">
          Message *
          <textarea
            name="message"
            placeholder="Write your message here…"
            value={formData.message}
            onChange={handleChange}
            className={errorMessages.message ? 'invalid' : ''}
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
