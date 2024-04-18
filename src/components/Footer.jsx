import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";
import RopLogo from "../assets/icon/rop-logo.png";
import FoiLogo from "../assets/icon/foi-logo.png";
import Cookies from "js-cookie";

const Footer = () => {
  const barangay = Cookies.get("barangay");
  const currentYear = new Date().getFullYear();

  useEffect(() => {}, [barangay]);
  return (
    <footer className="d-flex flex-column justify-content-center  align-items-center">
      <hr />
      <section className="w-100 p-5 bg-white  d-flex  justify-content-center align-items-center ">
        <Container>
          <Row className="gap-2">
            <Col>
              <h4 className="fw-bold">
                {barangay != "default"
                  ? "BARANGAY CONTACT INFORMATION"
                  : "CONTACT INFORMATION"}
              </h4>
              <ul className="list-group" style={{ listStyleType: "none" }}>
                {barangay === "default" ? (
                  <>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaMapMarker /> Dagupan City
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaPhone /> +63 8837-04-95
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaEnvelope /> dagupan@gmail.com
                      </p>
                    </li>
                  </>
                ) : barangay === "Salapingao" ? (
                  <>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaMapMarker /> Barangay Salapingao
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaPhone /> 0938-956-1626
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaEnvelope /> barangaysalapiñgao@gmail.com
                      </p>
                    </li>
                  </>
                ) : barangay === "Lomboy" ? (
                  <>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaMapMarker /> Barangay Lomboy
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaPhone /> 0938-956-1626
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaEnvelope /> santillanisabelleguia@gmail.com
                      </p>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaMapMarker /> Dagupan City
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaPhone /> +63 8837-04-95
                      </p>
                    </li>
                    <li>
                      <p className="text-secondary fw-semibold">
                        <FaEnvelope /> dagupan@gmail.com
                      </p>
                    </li>
                  </>
                )}
              </ul>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              {barangay === "default" ? (
                <iframe
                  style={{ width: "50vw" }}
                  className="rounded"
                  height={300}
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Dagupan City&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              ) : barangay === "Salapingao" ? (
                <iframe
                  style={{ width: "50vw" }}
                  className="rounded"
                  height={300}
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Salapingao&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              ) : barangay === "Lomboy" ? (
                <iframe
                  style={{ width: "50vw" }}
                  className="rounded"
                  height={300}
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Lomboy Dagupan&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              ) : (
                <iframe
                  style={{ width: "55vw" }}
                  className="rounded"
                  height={300}
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Dagupan City&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="w-100">
        <Row className="p-5 gap-3 d-flex justify-content-center  ">
          <Col className="d-flex flex-column align-items-end gap-3 ">
            <img
              src={RopLogo}
              alt="rop"
              width={100}
              style={{
                filter: ` invert(100%)`,
              }}
            />
            <img
              src={FoiLogo}
              alt="foi"
              width={100}
              style={{
                filter: `invert(100%)`,
              }}
            />
          </Col>
          <Col>
            <div>
              <h6 className="fw-bold">REPUBLIC OF THE PHILIPPINES </h6>
              <p className="mt-3">
                All content is in the public domain unless otherwise stated.
                FREEDOM OF I
              </p>
            </div>
            <div>
              <h6 className="fw-bold">FREEDOM OF INFORMATION</h6>
              <p className="mt-3">
                Learn more about the Executive Order No. 2 - The order
                implementing Freedom of Information in the Philippines.
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <h6 className="fw-bold">ABOUT GOVPH</h6>
              <p className="mt-3">
                Learn more about the Philippine government, its structure, how
                government works and the people behind it.
              </p>
            </div>
            <ul className="list-group" style={{ listStyleType: "none" }}>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://www.gov.ph/"
                >
                  GOV.PH
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://data.gov.ph/index/home"
                >
                  Open Data Portal
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://www.officialgazette.gov.ph/"
                >
                  Official Gazette
                </a>
              </li>
            </ul>
          </Col>
          <Col style={{ maxWidth: 200 }}>
            <div>
              <h6 className="fw-bold">Executive</h6>
              <ul className="list-group" style={{ listStyleType: "none" }}>
                <li>
                  <a
                    className="text-decoration-none text-secondary"
                    href="https://op-proper.gov.ph/"
                  >
                    Office of the President
                  </a>
                </li>
                <li>
                  <a
                    className="text-decoration-none text-secondary"
                    href="https://sb.judiciary.gov.ph/"
                  >
                    Sandiganbayan
                  </a>
                </li>
                <li>
                  <a
                    className="text-decoration-none text-secondary"
                    href="https://www.officialgazette.gov.ph/"
                  >
                    Official Gazette
                  </a>
                </li>
                <li>
                  <a
                    className="text-decoration-none text-secondary"
                    href="https://doh.gov.ph/"
                  >
                    Department of Health
                  </a>
                </li>
                <li>
                  <a
                    className="text-decoration-none text-secondary"
                    href="https://www.dof.gov.ph/"
                  >
                    Department of Finance
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-3">
              <h6 className="fw-bold">Legislative</h6>
              <ul className="list-group" style={{ listStyleType: "none" }}>
                <li>
                  <a
                    className="text-decoration-none text-secondary"
                    href="https://legacy.senate.gov.ph/"
                  >
                    Senate of the Philippines
                  </a>
                </li>
                <li>
                  <a
                    className="text-decoration-none text-secondary"
                    href="https://www.congress.gov.ph/"
                  >
                    House of Representatives
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <h6 className="fw-bold">Judiciary</h6>
            <ul className="list-group" style={{ listStyleType: "none" }}>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://legacy.senate.gov.ph/"
                >
                  Supreme Court
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://www.congress.gov.ph/"
                >
                  Court of Appeals
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://www.congress.gov.ph/"
                >
                  Sandiganbayan
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://www.congress.gov.ph/"
                >
                  Court of Tax Appeals
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none text-secondary"
                  href="https://www.congress.gov.ph/"
                >
                  Judicial Bar and Council
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </section>
      <section
        className="w-100 pt-3 d-flex justify-content-center"
        style={{ backgroundColor: "#d3d3d3", overflow: "hidden" }}
      >
        <p>Copyright © {currentYear} BWBIMS. All rights reserved.</p>
      </section>
    </footer>
  );
};

export default Footer;
