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
        textAlign: "center",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        Republic of the Philippines
      </Text>
      <Text
        style={{
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        Province of Pangasinan
      </Text>
      <Text
        style={{
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        Municipality of Dagupan City
      </Text>
      <Text
        style={{
          fontSize: 12,
          marginBottom: 10,
        }}
      >
        Barangay {barangay}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        OFFICE OF THE PUNONG BARANGAY
      </Text>
      <Text
        style={{
          fontSize: 25,
          marginBottom: 20,
        }}
      >
        CLEARANCE
      </Text>
      <Text style={{
          textAlign: "left",
          marginBottom: 20,
        }}>TO WHOM IT MAY CONCERN:</Text>
      <Text style={{
          marginBottom: 20,
        }}>
        {" "}{" "}{" "}This Barangay {barangay}, Dagupan City, has no objection to the 
        renewal for CY2023 for the
      </Text>
      <Text
        style={{
          fontSize: 25,
          marginBottom: 12,
        }}
      >
        BUSINESS PERMIT
      </Text>
      <Text style={{
          marginBottom: 12,
        }}>
          to
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
          {formData.lastName}, {formData.firstName} {formData.middleName}
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        {" "}{" "}{" "}The issuance of this Clearance is subject to the condition that the above  
        name has compiled with and shall continue to comply with all existing laws, rules, & regulations
        governing the holding of the same.
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        Issued {new Date(formData.date).toLocaleString()} at {barangay} Barangay Hall, Dagupan City.
      </Text>
    </Page>
  </Document>
);

const ViewBusinessPermitPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BWIMS_API_KEY
          }/api/forms/businessPermit/${id}`,
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
              <Card.Header>Business Permit Details</Card.Header>
              <Card.Body>
                <Card.Text>
                  <PDFViewer width="100%" height="600">
                    <PDFDocument formData={formData} barangay={barangay} />
                  </PDFViewer>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </div>
  );
};

export default ViewBusinessPermitPage;
