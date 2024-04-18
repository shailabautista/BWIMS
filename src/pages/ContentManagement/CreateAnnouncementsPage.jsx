import { useState, useEffect } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const formatDateTime = (datetimeString) => {
  const date = new Date(datetimeString);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};



const CreateAnnouncementsPage = () => {
  const [barangayData, setBarangayData] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    message: "",
    name: "",
    position: "",
    institution: "",
    location: "",
  });
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`
        );
        setBarangayData(response.data);
      } catch (error) {
        toast.error("Error fetching data!");
      }
    };

    fetchData();
  }, [barangay, token, barangayData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/announcements/`,
        {
          date: formData.date,
          message: formData.message,
          user: {
            name: formData.name,
            position: formData.position,
            institution: formData.institution,
            location: formData.location,
          },
          userId: userId,
        }
      );
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
        {
          announcements: [
            ...(barangayData?.announcements || []),
            response.data.data._id,
          ],
        }
      );
      toast.success("You have created an announcement!");
      setFormData({
        date: "",
        message: "",
        name: "",
        position: "",
        institution: "",
        location: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating announcement!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this announcement?"))
        return;
      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/announcements/${id}`
      );
      setBarangayData(null);
      toast.success("Announcement deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting announcement!", error);
    }
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Date and Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPosition" className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formInstitution" className="mb-3">
          <Form.Label>Institution</Form.Label>
          <Form.Control
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formLocation" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreate}>
          Create an Announcement
        </Button>
      </Form>
      <section className="mt-2 bg-white p-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-success fw-bold text-center">Announcements</h2>
        <div
          style={{
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { width: 0 },
          }}
        >
          <Container>
            {barangayData &&
              barangayData.announcements &&
              barangayData.announcements.map((announcement, index) => (
                <Card className="m-2 p-2 w-100" key={index}>
                  <Card.Title className="d-flex justify-content-center fs-4 fw-bold">
                    Announcements
                  </Card.Title>
                  <Card.Body>
                    <p>{formatDateTime(announcement.date)}</p>
                    <p>Dear Fellow Dagupenos,</p>

                    <p>{announcement.message}</p>

                    <p>Sincerely,</p>

                    <div>
                      {announcement.user.name} <br />
                      {announcement.user.position} <br />
                      {announcement.user.institution} <br />
                      {announcement.user.location}
                    </div>
                  </Card.Body>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(announcement._id)}
                  >
                    Delete
                  </Button>
                </Card>
              ))}
          </Container>
        </div>
      </section>
    </Container>
  );
};

export default CreateAnnouncementsPage;
