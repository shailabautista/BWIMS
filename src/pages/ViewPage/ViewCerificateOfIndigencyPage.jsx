import { useState, useEffect } from "react";
import { Spinner, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import Cookies from "js-cookie";

const ViewCertificateOfIndigencyPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [clearanceData, setClearanceData] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/indigency/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClearanceData(response.data);
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
          {clearanceData && (
            <Card>
              <Card.Header>Certificate of Indigency Details</Card.Header>
              <Card.Body>
                <Card.Text>
                  <p>First Name: {clearanceData.firstName}</p>
                  <p>Middle Name: {clearanceData.middleName}</p>
                  <p>Last Name: {clearanceData.lastName}</p>
                  <p>Contact No: {clearanceData.contactNo}</p>
                  <p>Date: {new Date(clearanceData.date).toLocaleString()}</p>
                  <p>Purpose: {clearanceData.purpose}</p>
                  <p>Status: {clearanceData.status}</p>
                  <p>Pick Up: {clearanceData.pickUp}</p>
                  <p>Color: {clearanceData.color}</p>
                  <p>{clearanceData.pickUp === "delivery" && `Fee: ${clearanceData.fee}`}</p>
                  <p>Address: {`
                  ${clearanceData.address.houseNumber && `#${clearanceData.address.houseNumber}, `} 
                  ${clearanceData.address.street && `${clearanceData.address.street}, `}  
                  ${clearanceData.address.barangay && `Brgy.${clearanceData.address.barangay}, `} 
                  ${clearanceData.address.municipality && `${clearanceData.address.municipality}, `} 
                  ${clearanceData.address.province && `${clearanceData.address.province}, `} 
                  ${clearanceData.address.country && `${clearanceData.address.country} `} 
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

export default ViewCertificateOfIndigencyPage;
