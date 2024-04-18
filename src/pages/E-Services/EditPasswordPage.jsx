import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Spinner,Button, Card, CardBody, CardHeader, Container, Form } from "react-bootstrap";

const EditPasswordPage = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get('userId');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return; 
    }

    setLoading(true);

    const { oldPassword, newPassword, confirmNewPassword } = formData;
    

    if (newPassword !== confirmNewPassword) {
      alert("New Passwords do not match!");
      setLoading(false);
      return;
    }

    try {

      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/changePassword/${userId}`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password changed successfully!");
      setLoading(false);
    } catch (error) {
      alert(`Error changing password: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <Card className="w-100" style={{maxWidth: 500}}>
          <CardHeader className="bg-success text-white">Password Details</CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" variant="success" className="w-25 fw-bold mt-3">
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner> 
                  ):
                  "Save"
                  }
                </Button>
              </Form.Group>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default EditPasswordPage;
