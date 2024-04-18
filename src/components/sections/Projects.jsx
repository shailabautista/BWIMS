import { Col, Card, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Projects = ({ projects }) => {
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
    <section className="mt-2 bg-white p-5">
      <h2 className="text-success fw-bold text-center">
        {location.pathname === "/" ? "OUR" : "BARANGAY"} FEATURED PROJECTS
      </h2>
      <Container>
        <p className="text-center fs-5">
          Our barangay maintains security, peace, and order for all inhabitants,
          pursue the ideals of a free and progressive community, implement basic
          health services, protect the rights of children, train and educate the
          youth, respect the rights and equal protection of the law for the men
          and women, take care of our elders, from the grass-roots to the
          highest level of our community.
        </p>
        <div style={scrollContainerStyle}>
          <Container className="d-flex gap-3">
            {projects
              .map((project, index) => (
                <Col key={index} style={{ flex: "0 0 auto", width: "300px" }}>
                  <Card className="mt-2 h-100">
                    <Card.Img
                      variant="top"
                      src={project.img}
                      alt={`Projects ${index + 1}`}
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="text-secondary fw-bold">
                        {truncate(project.title, 20)}{" "}
                      </Card.Title>
                      <hr />
                      <Card.Text>{truncate(project.description, 70)}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link
                        className="w-100 btn btn-outline-secondary"
                        to={`/view-project/${project._id}`}
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

export default Projects;
