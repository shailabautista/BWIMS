import { useState, useEffect } from "react";
import { Spinner, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
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
        CERTIFICATE OF RESIDENCY
      </Text>{" "}
      <Text style={{
          marginBottom: 20,
        }}>TO WHOM IT MAY CONCERN:</Text>
      <Text style={{
          marginBottom: 20,
        }}>
        {" "}{" "}{" "}{" "}{" "}{" "}This is to certify that {formData.lastName},
        {formData.firstName} {formData.middleName} male/female, married/single
        of legal age. Filipino Citizen is a bonafide of Barangay {barangay},
        Dagupan City,
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        {" "}{" "}{" "}{" "}{" "}{" "}Certifying further, that above-named person, is
        a person of good moral character and has no derogatory and/or criminal records
        in the barangay.
      </Text>
      <Text style={{
          marginBottom: 20,
        }}>
        Issued {new Date(formData.date).toLocaleString()} at {barangay} Barangay Hall, Dagupan City.
      </Text>
    </Page>
  </Document>
);

const ViewCertificateOfResidencyPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [clearanceData, setClearanceData] = useState(null);
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/residency/${id}`,
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
              <Card.Header>Certificate of Residency Details</Card.Header>
              <Card.Body>
                <Card.Text>
                  <PDFViewer width="100%" height="600">
                    <PDFDocument formData={clearanceData} barangay={barangay} />
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

export default ViewCertificateOfResidencyPage;
