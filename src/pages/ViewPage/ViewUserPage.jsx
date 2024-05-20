import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  Image,
  Button,
} from "react-bootstrap";

import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";

const ViewUserPage = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const barangays = ["Salapingao", "Lomboy"];
  const [user, setUser] = useState({
    fName: "",
    mName: "",
    lName: "",
    extensionName: "",
    email: "",
    contactNo: "",
    birthday: "",
    birthplace: "",
    status: "",
    nationality: "",
    sex: "",
    companyName: "",
    position: "",
    salaryRange: "",
    isHeadOfFamily: false,
    isRegisteredVoter: false,
    isEmployed: false,
    is4ps: false,
    address: {
      street: "",
      houseNumber: 0,
      barangay: "",
      municipality: "",
      province: "",
      country: "",
    },
  });
  const MIN_AGE = 18;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      await fetchUserData();
    };

    if (id && token) {
      initializeUser();
    }
  }, [id, token]);

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

  useEffect(() => {
    if (userData) {
      setUser((prevUser) => ({
        ...prevUser,
        fName: userData.fName || "",
        mName: userData.mName || "",
        lName: userData.lName || "",
        extensionName: userData.extensionName || "",
        email: userData.email || "",
        contactNo: userData.contactNo || "",
        birthday: userData.birthday
          ? new Date(userData.birthday).toISOString().split("T")[0]
          : "",
        birthplace: userData.birthplace || "",
        status: userData.status || "",
        nationality: userData.nationality || "",
        sex: userData.sex || "",
        companyName: userData.companyName || "",
        position: userData.position || "",
        salaryRange: userData.salaryRange || "",
        isHeadOfFamily: userData.isHeadOfFamily || false,
        isRegisteredVoter: userData.isRegisteredVoter || false,
        isEmployed: userData.isEmployed || false,
        is4ps: userData.is4ps || false,
        address: {
          street: userData.address?.street || "",
          houseNumber: userData.address?.houseNumber || 0,
          barangay: userData.address?.barangay || "",
          municipality: userData.address?.municipality || "",
          province: userData.address?.province || "",
          country: userData.address?.country || "",
        },
      }));
    }
  }, [userData]);

  const handleUpdateForm = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      `Are you sure you want to update your personal info?`
    );
    if (!confirmed) {
      return;
    }

    const isValidName = (name) =>
      /^[a-zA-Z\s!@#$%^&*(),.?":{}|<>]+$/.test(name) &&
      !/\d/.test(name) &&
      !/[^a-zA-Z\s!@#$%^&*(),.?":{}|<>]/.test(name);
    const isValidContactNo = () => /^09\d{9}$/.test(user.contactNo);

    const isValidFirstName = isValidName(user.fName);
    const isValidMiddleName = isValidName(user.mName);
    const isValidLastName = isValidName(user.lName);

    if (!isValidFirstName) {
      return alert(
        "Invalid first name. Please use only letters and no special characters or numbers."
      );
    }

    if (!isValidMiddleName) {
      return alert(
        "Invalid middle name. Please use only letters and no special characters or numbers."
      );
    }

    if (!isValidLastName) {
      return alert(
        "Invalid last name. Please use only letters and no special characters or numbers."
      );
    }

    if (!isValidContactNo()) {
      return alert(
        "Invalid contact number. Please enter a valid 11-digit number starting with 09."
      );
    }

    const birthdayDate = new Date(user.birthday);

    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthdayDate.getFullYear();

    if (
      currentDate.getMonth() < birthdayDate.getMonth() ||
      (currentDate.getMonth() === birthdayDate.getMonth() &&
        currentDate.getDate() < birthdayDate.getDate())
    ) {
      age--;
    }

    if (age < MIN_AGE) {
      return alert(`You must be at least ${MIN_AGE} years old to register.`);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("You have updated your personal info!");
      await fetchUserData();
    } catch (error) {
      console.log(error);
      return alert("Update Information failed");
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Card>
        <CardHeader className="bg-success text-white">
          Account details
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleUpdateForm}>
            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <Image
                  src={
                    userData.profilePic ||
                    "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                  }
                  width={250}
                  roundedCircle
                />
              </Col>
              <Col>
                <Row className="mb-3">
                  <h4>Personal Info</h4>
                  <Col>
                    <Form.Label>
                      <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
                      First Name:
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
                    <Form.Label>Middle Name:</Form.Label>
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
                      <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
                      Last Name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lName"
                      value={user.lName}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Extension:</Form.Label>
                    <Form.Control
                      type="text"
                      name="extensionName"
                      value={user.extensionName}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>
                      <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
                      Nationality:
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
                      <span style={{ color: "red", marginLeft: 5 }}>*</span>
                      Marital Status:
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={user.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your marital status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Annulled">Annulled</option>
                      <option value="Separated">Separated</option>
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>
                      <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
                      Gender:
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
                      <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
                      Birthday:
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
                      <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
                      Birthplace:
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
                <hr />
                <h4>Economic Status</h4>
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
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="4ps Beneficiary"
                      name="is4ps"
                      checked={user.is4ps}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <h4>Contact Info</h4>
            <Row className="mb-3">
              <Col>
                <Form.Label>
                  <span style={{ color: "red", marginLeft: 5 }}>*</span> Email:
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
                  <span style={{ color: "red", marginLeft: 5 }}>*</span> Contact
                  No:
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="contactNo"
                  value={user.contactNo}
                  onChange={handleInputChange}
                  maxLength={11}
                  required
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
                  <span style={{ color: "red", marginLeft: 5 }}>*</span> Salary
                  Range:
                </Form.Label>
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
                  <span style={{ color: "red", marginLeft: 5 }}>*</span>{" "}
                  Barangay:
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
            <Button
              type="submit"
              variant="success"
              size="lg"
              className="fw-semibold"
            >
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ViewUserPage;
