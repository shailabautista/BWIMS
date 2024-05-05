import { useState, useEffect } from "react";
import { Spinner, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { PDFViewer, Document, Page, Text } from "@react-pdf/renderer";

const PDFDocument = ({ formData, barangay }) => (
  <Document>
    <Page
      style={{
        fontSize: 12,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        Republic of the Philippines
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        Province of Pangasinan
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        Municipality of Dagupan City
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          marginBottom: 10,
        }}
      >
        Barangay {barangay}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        OFFICE OF THE PUNONG BARANGAY
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          marginBottom: 20,
        }}
      >
        CERTIFICATE OF INDIGENCY
      </Text>{" "}
      <Text style={{
          marginBottom: 20,
        }}>TO WHOM IT MAY CONCERN:</Text>
      <Text style={{
          marginBottom: 20,
        }}>
        {" "}{" "}{" "}{" "}{" "}{" "}This is to certify that {formData.lastName},
        {formData.firstName} {formData.middleName} a permanent resident of Barangay {barangay},
        Dagupan City, and is personally to be a good moral character and a law 
        abiding citizen, and also considered as one of INDIGENT in this community.
       </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        Issued this certification upon request for whatever legal purpose
        it may serve them best.
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        Issued {new Date(formData.date).toLocaleString()} at {barangay} Barangay Hall, Dagupan City.
      </Text>
    </Page>
  </Document>
);

const ViewCertificateOfIndigencyPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [clearanceData, setClearanceData] = useState(null);
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const role = Cookies.get("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/indigency/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
                <Card.Text>
                {
                  role === "user" ?
                  (
                    <>
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
                    </>
                  ) : (
                    <PDFViewer width="100%" height="600">
                      <PDFDocument formData={formData} barangay={barangay}/>
                    </PDFViewer>
                  )
                }
                  
                </Card.Text>
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
