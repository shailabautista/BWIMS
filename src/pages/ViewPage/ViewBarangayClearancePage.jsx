import { useState, useEffect } from "react";
import { Spinner, Container, Card, Button } from "react-bootstrap";
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
        BARANGAY CLEARANCE
      </Text>{" "}
      <Text style={{
          marginBottom: 20,
        }}>TO WHOM IT MAY CONCERN:</Text>
      <Text style={{
          marginBottom: 20,
        }}>
        {" "}{" "}{" "}This is to certify that {formData.lastName},
        {formData.firstName} {formData.middleName} male/female, married/single
        of legal age, Filipino and a resident of Barangay {barangay},
        Dagupan City, is known me personally to be a good moral character and a law 
        abiding citizen of this Barangay.
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        It is futher certified that above-named person has never 
        been accused in any crime.
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        This certification is issued upon request for whatever legal purpose
        and intends it may serve.
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        Issued {new Date(formData.date).toLocaleString()} at {barangay} Barangay Hall, Dagupan City.
      </Text>
    </Page>
  </Document>
);

const ViewBarangayClearancePage = () => {
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
          }/api/forms/barangayClearance/${id}`,
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
              <Card.Header>Barangay Clearance Details</Card.Header>
              <Card.Body>
                <Card.Text>
                  <PDFViewer width="100%" height="600">
                    <PDFDocument formData={formData} barangay={barangay}/>
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

export default ViewBarangayClearancePage;
