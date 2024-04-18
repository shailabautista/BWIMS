import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap"; 
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";


const ResetPasswordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [resetPassword, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/e-services/announcements");
    }
  }, [token, navigate])

  const handleReset = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/reset/${id}`,
        { newPassword: resetPassword }
      );
      navigate(-1);
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Reset Password Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="p-2">
      <h2 className="fs-1 fw-semibold">Reset Password</h2>
      <Form>
        <Form.Group controlId="formBasicPassword" className="fs-4">
          <Form.Label>Enter New Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={resetPassword}
            className="fo"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="success my-2 fs-4" size="lg" onClick={handleReset} disabled={loading}>
          {loading ? "Loading..." : "Reset"}
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordPage;
