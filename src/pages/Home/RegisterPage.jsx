import { useState, useEffect } from "react";
import { Spinner, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fName: "",
    mName: "",
    lName: "",
    email: "",
    birthday: "",
    birthplace: "",
    status: "",
    nationality: "",
    sex: "",
    companyName: "",
    position: "",
    salaryRange: "10,000 and less",
    isHeadOfFamily: false,
    isRegisteredVoter: false,
    isEmployed: false,
    address: {
      street: "",
      houseNumber: 0,
      barangay: "",
      municipality: "Dagupan",
      province: "Pangasinan",
      country: "Philippines",
    },
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  const barangays = ["Salapingao", "Lomboy"];
  const MIN_AGE = 18;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "birthday") {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: new Date(value).toISOString().split("T")[0],
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: checked,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isValidName = (name) =>
      /^[a-zA-Z\s!@#$%^&*(),.?":{}|<>]+$/.test(name) &&
      !/\d/.test(name) &&
      !/[^a-zA-Z\s!@#$%^&*(),.?":{}|<>]/.test(name);
    const isValidContactNo = (contactNo) => /^09\d{9}$/.test(contactNo);
    const isStrongPassword = (password) =>
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    const isOverMinAge = (birthday) => {
      const birthdayDate = new Date(birthday);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthdayDate.getFullYear();
      if (
        currentDate.getMonth() < birthdayDate.getMonth() ||
        (currentDate.getMonth() === birthdayDate.getMonth() &&
          currentDate.getDate() < birthdayDate.getDate())
      ) {
        age--;
      }
      return age >= MIN_AGE;
    };

    if (loading) return;
    setLoading(true);

    if (!isValidName(user.fName)) {
      setLoading(false);
      return toast.error(
        "Invalid first name. Please use only letters and no numbers."
      );
    }
    if (!isValidName(user.mName)) {
      setLoading(false);
      return toast.error(
        "Invalid middle name. Please use only letters and no numbers."
      );
    }
    if (!isValidName(user.lName)) {
      setLoading(false);
      return toast.error(
        "Invalid last name. Please use only letters and no numbers."
      );
    }
    if (!isValidContactNo(user.contactNo)) {
      setLoading(false);
      return toast.error(
        "Invalid contact number. Please enter a valid 11-digit number starting with 09."
      );
    }
    if (!isStrongPassword(user.password)) {
      setLoading(false);
      return toast.error(
        "Weak password. Please use at least 8 characters with a combination of letters and numbers."
      );
    }
    if (!isOverMinAge(user.birthday)) {
      setLoading(false);
      return toast.error(
        `You must be at least ${MIN_AGE} years old to register.`
      );
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/`,
        user
      );
      toast.success(
        "You have created a new account! Check your email for verification"
      );
      navigate("/");
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("token");

    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container className="p-5">
      <h1 className="mt-4 fw-bold text-success">Create a new account</h1>
      <hr />
      <h4>Personal Information</h4>
      <Form onSubmit={handleRegister}>
        <Row className="mb-3">
          <Col>
            <Form.Label>
              First Name:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="fName"
              value={user.fName}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>
              Middle Name:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="mName"
              value={user.mName}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>
              Last Name:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="lName"
              value={user.lName}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>
              Nationality:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              value={user.nationality}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>
              Status:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={user.status}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>
              Gender:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="sex"
              value={user.sex}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>
              Birthday:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={user.birthday}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>
              Birthplace:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="birthplace"
              value={user.birthplace}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Check
              type="checkbox"
              label="Is Head of Family"
              name="isHeadOfFamily"
              checked={user.isHeadOfFamily}
              onChange={handleCheckboxChange}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Is Registered Voter"
              name="isRegisteredVoter"
              checked={user.isRegisteredVoter}
              onChange={handleCheckboxChange}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Is Employed"
              name="isEmployed"
              checked={user.isEmployed}
              onChange={handleCheckboxChange}
            />
          </Col>
        </Row>
        <hr />
        <h4>Occupation</h4>
        <Row className="mb-3">
          <Col>
            <Form.Label>Company Name:</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              value={user.companyName}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Label>Position:</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={user.position}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Label>
              Salary Range:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>{" "}
            <Form.Control
              as="select"
              name="salaryRange"
              value={user.salaryRange}
              onChange={handleInputChange}
              required
            >
              <option value="5,000 below">5,000 below</option>
              <option value="5,000 - 10,000">5,000 - 10,000</option>
              <option value="10,000 - 30,000 ">10,000 - 30,000 </option>
              <option value="30,000 above">30,000 above</option>
            </Form.Control>
          </Col>
        </Row>
        <hr />

        <h4>Permanent Address</h4>
        <Row className="mb-3">
          <Col>
            <Form.Label>House Number: </Form.Label>
            <Form.Control
              type="number"
              name="houseNumber"
              value={user.address.houseNumber}
              onChange={(e) =>
                handleAddressChange({
                  target: { name: "houseNumber", value: e.target.value },
                })
              }
            />
          </Col>
          <Col>
            <Form.Label>Street: </Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={user.address.street}
              onChange={handleAddressChange}
            />
          </Col>
          <Col>
            <Form.Label>
              Barangay:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="barangay"
              value={user.address.barangay}
              onChange={handleAddressChange}
              required
            >
              <option value="">Select your barangay</option>
              {barangays.map((barangay) => (
                <option key={barangay} value={barangay}>
                  {barangay}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>

        <hr />
        <h4>Account Information</h4>

        <Row className="mb-3">
          <Col>
            <Form.Label>
              Email:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>
              Contact No:
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="contactNo"
              value={user.contactNo}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>
              Password:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>
              Confirm Password:{" "}
              <span style={{ color: "red", marginLeft: 5 }}>*Required</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>
        <Button
          type="submit"
          variant="success"
          size="lg"
          className="fw-semibold"
        >
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
