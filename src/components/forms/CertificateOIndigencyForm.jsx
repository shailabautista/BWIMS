import { useState, useEffect } from "react";
import {
  Spinner,
  Card,
  Container,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import useCurrentUserData from "../../hooks/useCurrentUserData";
import Loading from "../Loading";
import { purposeOptions } from "../../data/purposeOptions";

const CertificateOfIndigencyForm = () => {
  const token = Cookies.get("token");
  const { userData, loading: userDataLoading } = useCurrentUserData();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    extensionName: "",
    contactNo: "",
    address: {
      street: "",
      houseNumber: "",
      barangay: "",
      municipality: "",
      province: "",
      country: "",
    },
    pickUp: "pickUp",
    color: "blackAndWhite",
    date: new Date().toISOString().split("T")[0],
    purpose: "",
    fee: 0,
    userId: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: userData.fName || "",
        middleName: userData.mName || "",
        lastName: userData.lName || "",
        extensionName: userData.extensionName || "",
        contactNo: userData.contactNo || "",
        userId: userData._id || "",
        address: {
          street: userData.address.street || "",
          houseNumber: userData.address.houseNumber || "",
          barangay: userData.address.barangay || "",
          municipality: userData.address.municipality || "",
          province: userData.address.province || "",
          country: userData.address.country || "",
        },
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pickUp" && value === "delivery") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        fee: 70,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      if (!formData.purpose) {
        setLoading(false);
        toast.error("Please add your purpose!");
      }
      await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/indigency`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Certificate of Indigency form submitted successfully!");
      setFormData({
        ...formData,
        date: new Date().toISOString().split("T")[0],
        purpose: "",
        userId: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userDataLoading) return <Loading />;

  return (
    <div>
      <Container className="w-75">
        <Card className="p-3">
          <Card.Title className="text-center fs-1 fw-bold">
            Certificate of Indigency
          </Card.Title>
          <hr />
          <Card.Body className="d-flex flex-column">
            <h4>Personal Information</h4>
            <Row className="mb-3">
              <Col>
                <Form.Label>
                  First Name:{" "}
                  <span style={{ color: "red", marginLeft: 5 }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <Form.Label>
                  Middle Name:{" "}
                  <span style={{ color: "red", marginLeft: 5 }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <Form.Label>
                  Last Name:{" "}
                  <span style={{ color: "red", marginLeft: 5 }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <Form.Label>
                  Extension Name:{" "}
                  <span style={{ color: "red", marginLeft: 5 }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="extensionName"
                  placeholder="Extension Name"
                  value={formData.extensionName}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                Contact Number:{" "}
                <span style={{ color: "red", marginLeft: 5 }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                placeholder="Contact Number"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <hr />
            <h4>Address Details</h4>
            <Row className="mb-3">
              <Col>
                <Form.Label>Street:</Form.Label>
                <Form.Control
                  type="text"
                  name="address.street"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>House Number: </Form.Label>
                <Form.Control
                  type="text"
                  name="address.houseNumber"
                  placeholder="House Number"
                  value={formData.address.houseNumber}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>
                  Barangay:{" "}
                  <span style={{ color: "red", marginLeft: 5 }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address.barangay"
                  placeholder="Barangay"
                  value={formData.address.barangay}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <hr />
            <h4>Form Details</h4>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>
                    Document Fee:{" "}
                    <span style={{ color: "red", marginLeft: 5 }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    required
                  >
                    <option value={0}>Free</option>
                    <option value={20}>₱ 20</option>
                    <option value={30}>₱ 30</option>
                    <option value={40}>₱ 40</option>
                    <option value={50}>₱ 50</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>
                    Color:{" "}
                    <span style={{ color: "red", marginLeft: 5 }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                  >
                    <option value="blackAndWhite">Black & White</option>
                    <option value="colored">Colored</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>
                    Date: <span style={{ color: "red", marginLeft: 5 }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Purpose: <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
              </Form.Label>
              <Form.Control
                as="select"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              >
                {purposeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="success"
              size="lg"
              className="fw-bold"
              onClick={handleSubmit}
            >
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Submit"
              )}
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CertificateOfIndigencyForm;
