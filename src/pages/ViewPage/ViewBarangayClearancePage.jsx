import { useState, useEffect } from "react";
import { Spinner, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import Cookies from "js-cookie";

const ViewBarangayClearancePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/barangayClearance/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, id]);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container className="w-75">
          {formData && (
            <Card>
              <Card.Header>Barangay Clearance Details</Card.Header>
              <Card.Body>
                <Card.Text>
                  <p>First Name: {formData.firstName}</p>
                  <p>Middle Name: {formData.middleName}</p>
                  <p>Last Name: {formData.lastName}</p>
                  <p>Contact No: {formData.contactNo}</p>
                  <p>Date: {new Date(formData.date).toLocaleString()}</p>
                  <p>Purpose: {formData.purpose}</p>
                  <p>Status: {formData.status}</p>
                  <p>Pick Up: {formData.pickUp}</p>
                  <p>Color: {formData.color}</p>
                  <p>{formData.pickUp === "delivery" && `Fee: ${formData.fee}`}</p>
                  <p>Address: {`
                  ${formData.address.houseNumber && `#${formData.address.houseNumber}, `} 
                  ${formData.address.street && `${formData.address.street}, `}  
                  ${formData.address.barangay && `Brgy.${formData.address.barangay}, `} 
                  ${formData.address.municipality && `${formData.address.municipality}, `} 
                  ${formData.address.province && `${formData.address.province}, `} 
                  ${formData.address.country && `${formData.address.country} `} 
                  `}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </div>
  );
};

export default ViewBarangayClearancePage;
