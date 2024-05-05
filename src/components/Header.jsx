import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { barangayData } from "../data/barangayData";
import LoginModal from "./LoginModal";
import Logo from "../assets/icon/bwims-logo.png";
import Cookies from "js-cookie";
import useCurrentUserData from "../hooks/useCurrentUserData";
import Loading from "./Loading";
import axios from "axios";
import useBarangayData from "../hooks/useBarangayData";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const myBarangay = Cookies.get("barangay");

  const [barangay, setBarangay] = useState(myBarangay || "default");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { userData, loading: userLoading } = useCurrentUserData();
  const { filteredBarangayData, loading: barangayLoading } = useBarangayData();

  const handleBarangay = (e) => {
    const selectedBarangay = e.target.value;
    if (location.pathname === "/" || location.pathname === "/about") {
      if (selectedBarangay === "default") {
        navigate("/");
      } else {
        navigate("/about");
      }
    }
    setBarangay(selectedBarangay);

    Cookies.set("barangay", selectedBarangay);
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {}, [barangay, myBarangay, token, userId, navigate]);

  const handleLogout = async () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");

    if (shouldLogout) {
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/${userId}`,
        {
          accountStatus: "offline",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Cookies.remove("token");
      Cookies.remove("userId");
      if (myBarangay === "default") {
        navigate("/");
      } else {
        navigate("/about");
      }
    }
  };

  if (userLoading && barangayLoading) return <Loading />;

  return (
    <div className="container p-4">
      <Row className="d-flex justify-content-between align-items-center gap-2">
        <Col className="d-flex align-items-center">
          <img src={Logo} alt="logo" width={100} />
          {filteredBarangayData && filteredBarangayData[0].logo && (
            <img
              src={
                filteredBarangayData[0].logo ||
                "https://firebasestorage.googleapis.com/v0/b/bwims-d1cba.appspot.com/o/barangay%2Flogo%2Fbwims-logo2.png?alt=media&token=fa0d713b-49e8-4662-a31c-f71e8816b886"
              }
              alt="logo"
              width={60}
              className="m-2"
            />
          )}
          <div className="ms-3">
            <h5 className="fw-normal text-secondary fs-3">
              Republic of the Philippines
            </h5>
            <h4 className="fw-bold fs-2">DAGUPAN CITY</h4>
          </div>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="d-flex justify-content-end align-items-center"
        >
          {token ? (
            <div className="d-flex flex-wrap flex-row gap-2 text-success">
              {userData && userData.role === "admin" && (
                <div className="d-flex flex-row gap-2 text-success">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2 text-success">
                    <select
                      className="form-select border border-secondary text-secondary"
                      value={barangay}
                      onChange={handleBarangay}
                    >
                      <option value="default">Select your barangay</option>
                      {barangayData.map((barangayItem, index) => (
                        <option
                          key={index}
                          value={barangayItem.name}
                          disabled={barangayItem.disabled}
                        >
                          {`${!barangayItem.disabled ? "* Brgy." : ""} ${
                            barangayItem.name
                          }`}
                        </option>
                      ))}{" "}
                    </select>
                  </div>
                </div>
              )}
              <Link
                to="/e-services/profile"
                className="text-decoration-none fw-bold text-success"
              >
                {userData
                  ? `Hi ${userData.fName} ${userData.lName}`
                  : "loading"}
              </Link>
              |
              <Link
                to="/e-services/announcements"
                className="text-decoration-none fw-bold text-success"
              >
                Dashboard
              </Link>
              |
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row gap-2 justify-content-center">
                <div
                  onClick={handleShowLoginModal}
                  className="btn btn-success fw-bold"
                >
                  Login
                </div>
                |
                <Link to="/register" className="btn btn-secondary fw-bold">
                  Register
                </Link>
              </div>
              <div>
                <label className="fw-bold text-secondary">
                  Explore Barangay:
                </label>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2 text-success">
                  <select
                    className="form-select border border-secondary text-secondary"
                    value={barangay}
                    onChange={handleBarangay}
                  >
                    <option value="default">Select your barangay</option>
                    {barangayData.map((barangayItem, index) => (
                      <option
                        key={index}
                        value={barangayItem.name}
                        disabled={barangayItem.disabled}
                      >
                        {`${!barangayItem.disabled ? "* Brgy." : ""} ${
                          barangayItem.name
                        }`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseLoginModal}
        barangay={barangay}
      />
    </div>
  );
};

export default Header;
