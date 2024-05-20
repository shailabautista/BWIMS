import { useState, useEffect } from "react";
import { Spinner, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { PDFViewer, Image, Document, Page, Text, View } from "@react-pdf/renderer";
import LomboyWatermark from "../../assets/watermark/lomboy.jpg";
import SalapingaoWatermark from "../../assets/watermark/salapingao.jpg";

const PDFDocument = ({ formData, barangay }) => (
  <Document>
    <Page
      style={{
        fontSize: 12,
        position: 'relative',
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
          textAlign: "center",
          fontSize: 12,
          marginTop: 18,
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
          marginBottom: 50,
        }}
      >
        CERTIFICATE OF RESIDENCY
      </Text>{" "}
      <Text style={{
          marginBottom: 20,
          paddingLeft: '2cm',
          paddingRight: '1.7cm',
        }}>TO WHOM IT MAY CONCERN:</Text>
      <Text style={{
          marginBottom: 20,
          paddingLeft: '2cm',
          paddingRight: '1.7cm',
        }}>
        {" "}{" "}{" "}{" "}{" "}{" "}This is to certify that {formData.lastName},
        {formData.firstName} {formData.middleName} male/female, married/single
        of legal age. Filipino Citizen is a bonafide of Barangay {barangay},
        Dagupan City,
      </Text>
      <Text style={{
          marginBottom: 20,
          paddingLeft: '2cm',
          paddingRight: '1.7cm',
        }}>
        {" "}{" "}{" "}{" "}{" "}{" "}Certifying further, that above-named person, is
        a person of good moral character and has no derogatory and/or criminal records
        in the barangay.
      </Text>
      <Text style={{
          marginBottom: 20,
          paddingLeft: '2cm',
          paddingRight: '1.7cm',
        }}>
        Issued {new Date(formData.date).toLocaleString()} at {barangay} Barangay Hall, Dagupan City.
      </Text>
    </Page>
  </Document>
);

const ViewCertificateOfResidencyPage = () => {
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
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/residency/${id}`,
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
              <Card.Header>Certificate of Residency Details</Card.Header>
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

export default ViewCertificateOfResidencyPage;
