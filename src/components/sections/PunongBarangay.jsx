import { Row, Col, Container } from "react-bootstrap";

const PunongBarangay = ({ punongBarangay }) => {
  return (
    <section className="mt-2 bg-white d-flex flex-column justify-content-center align-items-center">
      {punongBarangay && (
        <Container>
          <Row>
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <img src={punongBarangay.img} width={400} />
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center text-center p-2">
              <Container>
                <h4 className="text-uppercase">
                  MESSAGE FROM THE PUNONG BARANGAY {punongBarangay.name}
                </h4>
                <p>{punongBarangay.message}</p>
                <br />
                <h4 className="text-uppercase">{punongBarangay.name}</h4>
                <h6>PUNONG BARANGAY, {new Date().getFullYear()} </h6>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
      <div className="w-100 py-3 bg-success text-white d-flex justify-content-center text-center p-2">
        <h1 className="container">
          Get in touch with us. We’d love to hear from you.
        </h1>
      </div>
    </section>
  );
};

export default PunongBarangay;
