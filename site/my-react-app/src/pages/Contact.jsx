/* global $ */
import React, { useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

export const Contact = () => {
  useEffect(() => {
    // Check if jQuery is loaded
    if (typeof window.jQuery === 'undefined') {
      console.log('Loading jQuery from local file...');
      const script = document.createElement('script');
      script.src = '/js/jquery-3.7.1.min.js';
      script.onload = () => {
        console.log('jQuery loaded successfully');
        initializeJQuery();
      };
      document.head.appendChild(script);
    } else {
      console.log('jQuery already loaded');
      initializeJQuery();
    }

    const initializeJQuery = () => {
      // Cache jQuery selections
      const $form = $('#contactForm');
      const $inputs = $('.form-control');
      const $submitButton = $('#submitButton');
      const $successMessage = $('#successMessage');

      // Initially hide the success message
      $successMessage.hide();

      // Add input focus effects
      $inputs.on('focus', function() {
        $(this).parent().addClass('focused').fadeIn(300);
      }).on('blur', function() {
        if (!$(this).val()) {
          $(this).parent().removeClass('focused');
        }
      });

      // Form validation and submission
      $form.on('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const formData = {};

        // Validate each input with animation
        $inputs.each(function() {
          const $input = $(this);
          const value = $input.val().trim();
          formData[$input.attr('name')] = value;

          if (!value) {
            isValid = false;
            $input
              .addClass('is-invalid')
              .parent()
              .find('.invalid-feedback')
              .fadeIn(200);
          } else {
            $input
              .removeClass('is-invalid')
              .addClass('is-valid')
              .parent()
              .find('.invalid-feedback')
              .fadeOut(200);
          }
        });

        if (isValid) {
          // Disable form and show loading state
          $submitButton.prop('disabled', true).html(
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...'
          );

          // Simulate form submission (replace with actual API call)
          setTimeout(() => {
            $form.slideUp(400, () => {
              $successMessage
                .html(`Thank you for your message, ${formData.name}! We'll get back to you soon.`)
                .fadeIn(400);
            });
          }, 1500);
        }
      });

      // Reset form on clicking "Send another message"
      $('#resetForm').on('click', function() {
        $successMessage.fadeOut(400, () => {
          $form.trigger('reset')
            .find('.is-valid, .is-invalid')
            .removeClass('is-valid is-invalid');
          $submitButton.prop('disabled', false).html('Send Message');
          $form.slideDown(400);
        });
      });
    };

    // Cleanup
    return () => {
      if (window.jQuery) {
        $('.form-control').off();
        $('#contactForm').off();
        $('#resetForm').off();
      }
    };
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-4 text-center mb-5">Contact Us</h1>
          
          <div id="successMessage" className="alert alert-success text-center" role="alert">
            <p className="mb-2"></p>
            <button id="resetForm" className="btn btn-success">Send another message</button>
          </div>

          <Form id="contactForm" className="p-4 border rounded shadow-sm bg-white">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name"
                placeholder="Enter your name"
                required
              />
              <div className="invalid-feedback">Please enter your name</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                placeholder="Enter your email"
                required
              />
              <div className="invalid-feedback">Please enter a valid email</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="tel" 
                name="phone"
                placeholder="Enter your phone number"
                required
              />
              <div className="invalid-feedback">Please enter your phone number</div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                name="message"
                rows={4}
                placeholder="Enter your message"
                required
              />
              <div className="invalid-feedback">Please enter your message</div>
            </Form.Group>

            <button 
              id="submitButton"
              type="submit" 
              className="btn btn-success w-100"
            >
              Send Message
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};