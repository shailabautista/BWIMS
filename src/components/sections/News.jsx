import { Col, Card, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const News = ({ news }) => {
  const location = useLocation();
  const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength - 1) + "..." : str;
  };

  const scrollContainerStyle = {
    overflow: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  };

  return (
    <section className="mt-2 p-5">
      <h2 className="text-success fw-bold text-center">{location.pathname === "/" ? "OUR" : "BARANGAY"} NEWS AND EVENTS</h2>
      <Container>
        <p className="text-center fs-5">
          Get our latest, news and announcement! #DAGUPAN
        </p>
        <div style={scrollContainerStyle}>
          <Container className="d-flex gap-3">
            {news
              .map((service, index) => (
                <Col key={index} style={{ flex: "0 0 auto", width: "300px" }}>
                  <Card className="mt-2 h-100">
                    <Card.Img
                      variant="top"
                      src={service.img}
                      alt={`Announcement ${index + 1}`}
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="text-secondary fw-bold">
                        {truncate(service.title, 20)}
                      </Card.Title>
                      <hr />
                      <Card.Text>{truncate(service.description, 70)}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link
                        className="w-100 btn btn-outline-secondary"
                        to={`/view-news/${service._id}`}
                      >
                        Read More
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
              .reverse()}
          </Container>
        </div>
      </Container>
    </section>
  );
};

export default News;
