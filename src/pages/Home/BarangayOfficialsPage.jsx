import { Card, Container, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import useBarangayData from "../../hooks/useBarangayData";

const BarangayOfficialsPage = () => {
  const { filteredBarangayData, loading } = useBarangayData();
  const barangay = Cookies.get("barangay");

  if (!barangay || barangay === undefined) {
    Cookies.set('barangay','default')
  }
  
  if (loading) return <Loading />;

  
  return (
    <div className="mt-4">
      <h1 className="text-center fw-bold mb-4">
         {barangay !== "default" ? `Barangay ${barangay}` : 'City'} Officials
      </h1>
      <section className="w-100 p-5 bg-white">
        <Container>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredBarangayData[0].barangayOfficials.map((official, index) => (
              <Col key={index}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    className="h-100"
                    src={official.img || "https://i.stack.imgur.com/l60Hf.png"}
                    alt={official.name}
                    style={{
                      height: "100%",
                      maxHeight: 500,
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{official.name}</Card.Title>
                    <Card.Text>{official.position}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BarangayOfficialsPage;
