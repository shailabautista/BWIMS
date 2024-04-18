import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Container, Spinner, Button, Image } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";


const UserDetailsPage = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = Cookies.get('role');
  const token = Cookies.get("token");


  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      alert('Error fetching user details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id, token, role]);

  const updateRole = async (role) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to set the role to ${role}?`);
      if (!confirmed) {
        return;
      }

      const currentUserRole = user.role;

      if (currentUserRole.toLowerCase() === role.toLowerCase()) {
        alert(`User is already ${role}. No changes made.`);
        return;
      }

      await axios.put(`${import.meta.env.VITE_BWIMS_API_KEY}/api/users/updateRole/${id}`, { role }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchUser();

      alert(`You have successfully updated the role to ${role}`);
      await fetchUser();
    } catch (error) {
      alert('Error updating user role:', error);
    }
  }

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <Card>
            <Card.Body>
            <Row>
              <Col className="d-flex justify-content-center align-items-center">
              <Image src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" width={250} roundedCircle/>
              </Col>
              <Col>
                <h1 className="fw-bold">{`${user.fName} ${user.mName} ${user.lName}`}</h1>
                <div className="d-flex gap-2 mb-4">
                  <div className="bg-secondary text-white rounded-3 px-3 py-2 fw-bold d-flex align-items-center gap-2 fs-4">
                    <FaRegUserCircle />
                    {user.role}
                  </div>
                  
                  <div className="bg-success text-white rounded-3 px-3 py-2 fw-bold d-flex align-items-center fs-4">
                    {user.accountStatus}
                  </div>
                </div>
                <h4 className="fw-semibold">Contact Information</h4>
                <hr/>
                <p><span>Email address: </span>{user.email}</p>
                <p><span>Phone Number: </span>{user.contactNo}</p>
              </Col>
            </Row>
            </Card.Body>
          </Card>
          <Row className="mt-4">
          {
            role === 'admin' && (
            <Col>
              <Card>
                <Card.Body className="d-flex flex-column align-items-center  gap-2">
                  <h4 className="fw-bold">Settings</h4>
                  <Container className="d-flex flex-column align-items-center gap-2">
                  {user.role.toLowerCase() !== "user" && (
                      <Button 
                        variant="primary" 
                        className="w-100" 
                        size="lg"
                        onClick={() => updateRole("user")}
                      >
                        Set as User
                      </Button>
                    )}
                    {user.role.toLowerCase() !== "chairman" && (
                      <Button 
                        variant="secondary"
                        className="w-100" 
                        size="lg"
                        onClick={() => updateRole("chairman")}
                      >
                        Set as Chairman
                      </Button>
                    )}
                    {user.role.toLowerCase() !== "secretary" && (
                      <Button
                        variant="dark"
                        className="w-100" 
                        size="lg"
                        onClick={() => updateRole("secretary")}
                      >
                        Set as Secretary
                      </Button>
                    )}
                    {user.role.toLowerCase() !== "admin" && (
                      <Button
                        variant="success"
                        className="w-100" 
                        size="lg"
                        onClick={() => updateRole("admin")}
                      >
                        Set as Admin
                      </Button>
                    )}
                  </Container>
                </Card.Body>
              </Card>
            </Col>
            )}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default UserDetailsPage;
