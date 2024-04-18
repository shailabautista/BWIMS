import { Link } from "react-router-dom";
import { Card, CardBody, Container } from "react-bootstrap";
import { FaRegFileAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import useUsersData from "../../hooks/useUsersData";

const ResidentsDataPage = () => {
  const { users, loading } = useUsersData();
  const barangay = Cookies.get("barangay");

  const filteredUsers =
    barangay === "default"
      ? users
      : users.filter((user) => user.address.barangay === barangay);

  const contentData = [
    {
      id: 1,
      title: "Brgy. Residents",
      path: "/e-services/barangay-residents",
      data: filteredUsers.length,
    },
    {
      id: 2,
      title: "Head of the family",
      path: "/e-services/head-family",
      data: filteredUsers.filter((user) => user.isHeadOfFamily).length,
    },
    {
      id: 3,
      title: "Registered Voters",
      path: "/e-services/registered-voters",
      data: filteredUsers.filter((user) => user.isRegisteredVoter).length,
    },
    {
      id: 4,
      title: "Male Residents",
      path: "/e-services/male-residents",
      data: filteredUsers.filter((user) => user.sex === "Male").length,
    },
    {
      id: 5,
      title: "Female Residents",
      path: "/e-services/female-residents",
      data: filteredUsers.filter((user) => user.sex === "Female").length,
    },
    {
      id: 6,
      title: "Low Class Residents",
      path: "/e-services/lowclass-residents",
      data: filteredUsers.filter(
        (user) => user.salaryRange === "5,000 below" || user.salaryRange === "5,000 - 10,000" || user.salaryRange === "10,000 and less"
      ).length,
    },
    {
      id: 7,
      title: "Mid Class Residents",
      path: "/e-services/midclass-residents",
      data: filteredUsers.filter(
        (user) => user.salaryRange === "10,000 - 30,000"
      ).length,
    },
    {
      id: 8,
      title: "Upper Class Residents",
      path: "/e-services/upperclass-residents",
      data: filteredUsers.filter((user) => user.salaryRange === "30,000 above")
        .length,
    },
  ];

  if (loading) return <Loading />;

  return (
    <div className="d-flex justify-content-center">
      <Container className="shadow-lg w-75 p-4 rounded-2">
        <h1 className="text-center mb-4 fs-4">
          Accumulated data for{" "}
          {barangay === "default" ? "Dagupan City" : barangay}
        </h1>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
          {contentData.map((request) => (
            <Card
              key={request.id}
              className="mb-3 h-100 rounded-5"
              style={{ width: "18rem" }}
            >
              <CardBody className="d-flex flex-column justify-content-between align-items-center p-3">
                <FaRegFileAlt className="text-success fs-1" size={60} />
                <h4 className="text-center">{request.title}</h4>
                <p>
                  Total {request.data} out of {filteredUsers.length} households
                </p>
                <Link className="btn btn-outline-secondary" to={request.path}>
                  View Records
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ResidentsDataPage;
