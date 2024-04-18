import { useState } from 'react';
import { Form, Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import sendEmail from '../utils/sendEmail';

const ContactModal = ({ show, handleClose, email }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMessage = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await sendEmail({ to_email: email, subject: formData.subject, message: formData.message });
      toast.success('Message sent successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Enter a subject"
              value={formData.subject}
              size="lg"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button
            className="w-100 mt-3 mb-3 fw-semibold"
            variant="success"
            type="button"
            size="lg"
            onClick={handleMessage}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Send Message'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
