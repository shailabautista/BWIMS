import { useState, useEffect } from "react";
import { Spinner, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { PDFViewer, Image, Document, Page, Text, View } from "@react-pdf/renderer";
import LomboyWatermark from "../../assets/watermark/lomboy.jpg";
import SalapingaoWatermark from "../../assets/watermark/salapingao.jpg";

const PDFDocument = ({ formData, barangay }) => (
  <Document>
    <Page
      style={{
        fontSize: 12,
        position: 'relative',
        textAlign: "center",
        marginHorizontal: 12,

      }}
    >
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.3, 
        }}
      >
        <Image
          src={barangay === "Lomboy" ? LomboyWatermark : barangay === "Salapingao" ? SalapingaoWatermark : "" }
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
  
      <Text
        style={{
          fontSize: 12,
          marginTop: 20,
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
  const role = Cookies.get("role");

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
        <Container>
          {formData && (
            <Card>
              <Card.Header>Business Permit Details</Card.Header>
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
                    <PDFViewer width="100%" height="800">
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

export default ViewBusinessPermitPage;
