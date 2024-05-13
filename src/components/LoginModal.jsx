import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import sendEmail from "../utils/sendEmail";

const LoginModal = ({ show, handleClose, barangay }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (barangay === "default" || barangay === "") {
      alert(
        `You need to select your barangay before you log-in to make any transactions online`
      );
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/login`,
        formData
      );

      const { role, barangay: userBarangay } = response.data;
      const { token, userId, isVerified } = response.data;

      if (!isVerified) {
        alert(
          `You are not verified yet! Please wait for account verification!`
        );
        return;
      }
      if (role === "admin") {
        Cookies.set("role", role);
        Cookies.set("token", token);
        Cookies.set("userId", userId);
        alert("You have successfully logged in!");
        handleClose();
        return;
      }

      if (barangay !== userBarangay) {
        toast.error(
          `You are not registered in this barangay! Please register first in ${barangay}`
        );
        return;
      }

      Cookies.set("role", role);
      Cookies.set("token", token);
      Cookies.set("userId", userId);
      alert("You have successfully logged in!");
      handleClose();
    } catch (error) {
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/forgot`,
        { email: formData.email }
      );

      await sendEmail({
        to_email: formData.email,
        subject: "Forgot Password",
        message: `Click this link to reset your password https://bwims.vercel.app//reset/${response.data.userId}`,
      });

      toast.success("Check your email for reset password link!");
      //navigate(`/reset/${response.data.userId}`)
    } catch (error) {
      toast.error(error.error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              size="lg"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>

            <div className="w-100 form-control d-flex justify-content-between align-items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-100 fs-5"
                value={formData.password}
                style={{border: 0}}
                onChange={handleInputChange}
              />{" "}
              <Button
                variant="link"
                onClick={toggleShowPassword}
                className="d-flex justify-content-between align-items-center text-decoration-none"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <p className="fs-5 text-primary fw-semibold" onClick={handleForgot}>
              Forgot Password?
            </p>
          </div>
          <Button
            className="w-100 mt-3 mb-3 fw-semibold"
            variant="success"
            type="button"
            size="lg"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Login"
            )}
          </Button>

          <Form.Text className="text-muted fs-5  d-flex justify-content-center align-items-center gap-2 text-white">
            Don&apos;t have an account?{" "}
            <Link
              to="register"
              className="text-decoration-none fw-semibold"
              onClick={handleClose}
            >
              Register
            </Link>
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
