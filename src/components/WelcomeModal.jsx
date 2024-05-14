import { useState  } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import WelcomeImage from "../assets/profile/welcome.png";

const WelcomeModal = ({ show, handleClose, userId }) => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);

  const updateRegistrationStatus = async () => {
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
    } catch (error) {
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    await updateRegistrationStatus();
    handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Welcome to BWIMS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <img
            src={WelcomeImage}
            alt="Welcome"
            className="img-fluid"
            style={{ maxWidth: "50%" }}
          />
        </div>
        <p>
          Congratulations! We are happy that you have been successfully verified
          as a member of our barangay&apos;s e-services website. We hope to
          continue making progress with you. Maraming salamat po.
        </p>
      </Modal.Body>
      <Modal.Footer>
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
