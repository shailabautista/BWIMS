import { Link, useLocation } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import {
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
  Container,
} from "react-bootstrap";

const CardsContainerLayout = ({ data, buttonText }) => {
  const location = useLocation();

  return (
    <div className="d-flex justify-content-center">
      <Container className="shadow-lg w-75 p-4 rounded-2">
        <h1 className="text-center mb-4 fs-4">
          You may select the following services below
        </h1>
        <Row xs={1} md={2} className="g-4">
          {data.map((request) => (
            <Col key={request.id}>
              <Card className="mb-3 h-100 rounded-5">
                {request.image && (
                  <CardBody className="p-0">
                    <img
                      src={request.image}
                      alt="Banner"
                      className="w-100 h-100 object-fit-cover rounded-top-5"
                    />
                  </CardBody>
                )}
                <CardFooter className="d-flex flex-column justify-content-between align-items-center p-2">
                  {!request.image && (
                    <FaRegFileAlt className="text-success fs-1" size={120} />
                  )}
                  <h4 className="text-center">{request.title}</h4>
                  <Link className="btn btn-outline-secondary" to={request.path}>
                    {request.title === "Blotter" && location.pathname === "/e-services/services" ? "Inform us" : buttonText ? buttonText : "View"}
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CardsContainerLayout;
