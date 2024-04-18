import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import superAdminNavigationRoutes from "../routes/SuperAdminNavigationRoutes";
import userNavigationRoutes from "../routes/UserNavigationRoutes";
import adminNavigationRoutes from "../routes/AdminNavigationRoutes";
import Cookies from "js-cookie";

const Sidebar = () => {
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
    
      <aside className="bg-success p-4 d-none d-lg-block">
        <h3 className="d-flex gap-2 fw-bold text-white mb-4 text-uppercase">
          {role} Dashboard
        </h3>
        <nav>
          <ul className="list-unstyled d-flex flex-column gap-4">
            {renderNavigationRoutes()}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
