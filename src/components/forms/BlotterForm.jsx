import { useState } from "react";
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
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import axios from "axios";
import Cookies from "js-cookie";


const BlotterForm = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const barangayOptions = ["Salapingan", "Lomboy"];
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
    age: 18,
    address: {
      street: "",
      houseNumber: "",
      barangay: "",
    },
    date: new Date().toISOString().split("T")[0],
    narrativeReports: "",
    userId: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageUpload(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      if (!formData.narrativeReports) {
        setLoading(false);
        toast.error("Please add a narrative report!");
        return;
      }

      let imageURLs = [];
      if (imageUpload) {
        for (const image of imageUpload) {
          const imageRef = ref(storage, `form/blotter/${image.name}`);
          await uploadBytes(imageRef, image);
          const url = await getDownloadURL(imageRef);
          imageURLs.push(url);
        }
      }
      const isValidContactNo = (contactNo) => /^09\d{9}$/.test(contactNo);

      if (!isValidContactNo(formData.contactNo)) {
        return alert(
          "Invalid contact number. Please enter a valid 11-digit number starting with 09."
        );
      }
      await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/blotter`,
        {
          ...formData,
          photoURL: imageURLs,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blotter form submitted successfully!");
      setFormData({
        ...formData,
        date: new Date().toISOString().split("T")[0],
        narrativeReports: "",
        userId: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="w-75">
        <Card className="p-3">
          <Card.Title className="text-center fs-1 fw-bold">Blotter</Card.Title>
          <hr />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} multiple />
          </Form.Group>
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
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                Age
                <span style={{ color: "red", marginLeft: 5 }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <Form.Label>
                Contact Number:{" "}
                <span style={{ color: "red", marginLeft: 5 }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
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
                <Form.Label>House Number:</Form.Label>
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
                  as="select"
                  name="address.barangay"
                  value={formData.address.barangay}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Barangay</option>
                  {barangayOptions.map((barangay, index) => (
                    <option key={index} value={barangay}>
                      {barangay}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
            <hr />

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

            <Form.Group className="mt-3 mb-3">
              <Form.Label>
                Narrative Reports:{" "}
                <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="narrativeReports"
                placeholder="Narrative Reports"
                value={formData.narrativeReports}
                onChange={handleChange}
                required
              />
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

export default BlotterForm;
