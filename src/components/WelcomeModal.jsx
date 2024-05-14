import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import WelcomeImage from "../assets/profile/welcome.png";

const WelcomeModal = ({ show, handleClose, userId }) => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/${userId}`,
        { isFirstRegister: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleClose();
    } catch (error) {
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to BWIMS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
        <img src={WelcomeImage} alt="Welcome" className="img-fluid" style={{ maxWidth: '50%' }} />
        </div>
        <p>
          We&apos;re excited to have you onboard. BWIMS helps you manage your
          inquiries in the barangay efficiently and effectively. Let&apos;s get
          started!
        </p>
        <p>
          If you need any help, our support team is here to assist you. Enjoy
          your experience with BWIMS!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={loading}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Get Started"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
