import React, { useState, useEffect } from "react";
import { Spinner, Container, Card, Image, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ViewBlotterPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/blotter/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
              <Card.Header>Blotter Details</Card.Header>
              <Card.Body>
                <Carousel>
                  {formData.photoURL &&
                    formData.photoURL.map((url, index) => (
                      <Carousel.Item key={index}>
                        <Image
                          rounded
                          src={url}
                          className="d-block w-100"
                          alt={`Slide ${index}`}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
                <Card.Text>
                  <p>First Name: {formData.firstName}</p>
                  <p>Middle Name: {formData.middleName}</p>
                  <p>Last Name: {formData.lastName}</p>

                  <p>Contact No: {formData.contactNo}</p>
                  <p>Age: {formData.age}</p>
                  <p>
                    Address:{" "}
                    {`
                  ${
                    formData.address.houseNumber &&
                    `#${formData.address.houseNumber}, `
                  } 
                  ${formData.address.street && `${formData.address.street}, `}  
                  ${
                    formData.address.barangay &&
                    `Brgy.${formData.address.barangay}, `
                  } 
                  ${
                    formData.address.municipality &&
                    `${formData.address.municipality}, `
                  } 
                  ${
                    formData.address.province &&
                    `${formData.address.province}, `
                  } 
                  ${formData.address.country && `${formData.address.country} `} 
                  `}
                  </p>
                  <p>Date: {new Date(formData.date).toLocaleString()}</p>
                  <p>Status: {formData.status}</p>
                  <p>Narrative Reports:</p>
                  {formData.narrativeReports}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </div>
  );
};

export default ViewBlotterPage;
