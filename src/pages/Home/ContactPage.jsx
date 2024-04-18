import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useBarangayData from "../../hooks/useBarangayData";
import Loading from "../../components/Loading";

const ContactPage = () => {
  const location = useLocation();
  const userId = Cookies.get("userId");
  const barangay = Cookies.get("barangay");
  const { barangayData, loading: barangayLoading } = useBarangayData();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    message: "",
    location: "",
    barangay: barangay,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/contacts/`,
        {
          ...formData,
          userId: userId,
        }
      );
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
        {
          contacts: [...(barangayData?.contacts || []), response.data.data._id],
        }
      );
      toast.success("You have successfully contact us!");
      setFormData({
        fName: "",
        lName: "",
        email: "",
        phoneNumber: "",
        message: "",
        location: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating message!", error);
    } finally {
      setLoading(false);
    }
  };

  if (barangayLoading) return <Loading />;

  return (
    <div>
      {location.pathname === "/contact" && barangay === "default" ? (
        <Container className="text-center">
          <h1
            className=" fw-bold mt-4"
            style={{ fontSize: `clamp(1.5rem, -1.3125rem + 9vw, 3.75rem)` }}
          >
            Contact Us
          </h1>
          <h5 className=" text-secondary mb-3">
            We appreciate your interest in the City of Dagupan. We are committed
            to serving our residents, businesses, and visitors. Please get in
            touch with us via the various means provided below. Our dedicated
            team will respond to your query as soon as possible.
          </h5>

          <div className="mb-3">
            <h3 className="fw-bold">City Hall of Dagupan</h3>
            <p>
              <strong>Address:</strong> Dagupan City Hall Complex, AB Fernandez
              Ave., Dagupan City
            </p>
            <p>
              <strong>Office Hours:</strong> Monday – Friday, 8:00 AM – 5:00 PM
            </p>
          </div>

          <div className="mb-3">
            <h3 className="fw-bold">General Inquiries</h3>
            <p>
              <strong>Email:</strong> dagupanlgu@gmail.com
            </p>
          </div>

          <div className="mb-3">
            <h3 className="fw-bold">Mayor’s Office</h3>
            <p>
              <strong>Address:</strong> 2nd Floor Dagupan City Hall Complex, AB
              Fernandez Ave., Dagupan City
            </p>
            <p>
              <strong>Email:</strong> dagupanlgu@gmail.com
            </p>
            <p>
              <strong>Office Hours:</strong> Monday – Friday, 8:00 AM – 5:00 PM
            </p>
          </div>

          <div className="mb-3">
            <h3 className="fw-bold">Tourism Office</h3>
            <p>
              <strong>Telephone:</strong> 656-5056
            </p>
          </div>

          <div className="mb-3">
            <h3 className="fw-bold">Emergency Services</h3>
            <p>
              <strong>PNP Dagupan:</strong> 0916-525-6802 / 0933-502-4899 /
              529-5604
            </p>
            <p>
              <strong>BFP Dagupan:</strong> 0917-184-2611 / 522-2772
            </p>
            <p>
              <strong>PANDA Volunteers:</strong> 0932-548-1545 / 522-2808 /
              522-8202
            </p>
            <p>
              <strong>CDRRMO:</strong> 0968-444-9598 / 540-0363
            </p>
            <p>
              <strong>CHO:</strong> 0933-861-6088 / 0997-840-1377 / 522-8206
            </p>
            <p>
              <strong>Red Cross Dagupan:</strong> 0928-559-2701 / 632-3296
            </p>
            <p>
              <strong>DECORP:</strong> 0925-726-9546 / 522-5433 / 522-4145 /
              515-2870
            </p>
            <p>
              <strong>PAMANA:</strong> 515-3140
            </p>
            <p>
              <strong>PESO / OFW Desk:</strong> 0915-421-6885 / 505-6256
            </p>
            <p>
              <strong>CSWDO:</strong> 515-3140 / 632-2566
            </p>
            <p>
              <strong>POSO:</strong> 0967-435-7097 / 0919-248-2531
            </p>
            <p>
              <strong>ANTI-VAWC Helpline:</strong> 0933-378-8888
            </p>
            <p>
              <strong>ANTI-BULLYING Helpline:</strong> 0960-260-6036
            </p>
            <p>
              <strong>ANTI-SUICIDE Helpline:</strong> 0969-045-1111
            </p>
          </div>

          <div className="mb-3">
            <h3 className="fw-bold">Social Media</h3>
            <p>
              Follow us on our official social media channels for the latest
              updates about the city.
            </p>
            <p>
              <strong>Facebook:</strong> City Government of Dagupan –
              Information Office
            </p>
            <p>
              <strong>Facebook:</strong> Mayor Belen T. Fernandez
            </p>
          </div>

          <p className="">
            Thank you for your interest in the City of Dagupan. We look forward
            to serving you.
          </p>
        </Container>
      ) : (
        <>
          <h1
            className="text-center fw-bold mt-4"
            style={{ fontSize: `clamp(1.5rem, -1.3125rem + 9vw, 3.75rem)` }}
          >
            Contact us
          </h1>
          <h5 className="text-center mb-3 ">
            We&apos;d love to hear your thoughts!
          </h5>
          <section className="p-5 bg-white">
            <Container>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fName"
                        placeholder="Enter your first name"
                        size="lg"
                        required
                        value={formData.fName}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lName"
                        placeholder="Enter your last name"
                        size="lg"
                        required
                        value={formData.lName}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        size="lg"
                        required
                        value={formData.email}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        size="lg"
                        required
                        value={formData.phoneNumber}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={10}
                    placeholder="Type your message here"
                    value={formData.message}
                    onChange={handleInput}
                    required
                  />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  size="lg"
                  className="fw-semibold mt-3"
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
          </section>
        </>
      )}
    </div>
  );
};

export default ContactPage;
