import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import superAdminNavigationRoutes from "../routes/SuperAdminNavigationRoutes";
import userNavigationRoutes from "../routes/UserNavigationRoutes";
import adminNavigationRoutes from "../routes/AdminNavigationRoutes";
import Cookies from "js-cookie";

const ServiceNavbar = () => {
  const location = useLocation();
  const role = Cookies.get("role");

  const renderNavigationRoutes = () => {
    let navigationRoutes;

    if (role === "admin") {
      navigationRoutes = superAdminNavigationRoutes;
    } else if (role === "chairman" || role === "secretary") {
      navigationRoutes = adminNavigationRoutes;
    } else {
      navigationRoutes = userNavigationRoutes;
    }

    return navigationRoutes.map((item, index) => (
      <Nav.Item key={index}>
        <Nav.Link
          as={Link}
          to={item.path}
          className={`text-white text-decoration-none fs-6 d-flex flex-row align-items-center ${
            item.path === location.pathname
              ? "fw-bold bg-dark p-2 rounded-2"
              : ""
          }`}
        >
          {<item.icon className="me-2" />}
          {item.name}
        </Nav.Link>
      </Nav.Item>
    ));
  };

  return (
    <>
     <Navbar bg='success' variant='dark' expand='lg' className='justify-content-center d-lg-none'>
        <Container>
          <Navbar.Toggle aria-controls='navbar-nav' />
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='mx-auto gap-4'>
            {renderNavigationRoutes()}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
    </>
  );
};

export default ServiceNavbar;
