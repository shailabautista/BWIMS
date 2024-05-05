import { Link } from "react-router-dom";
import { Card, CardBody, Container } from "react-bootstrap";
import { FaRegFileAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import useUsersData from "../../hooks/useUsersData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
      data: filteredUsers.length,
      path: "/e-services/barangay-residents",
    },
    {
      id: 2,
      title: "Head of the Family",
      data: filteredUsers.filter((user) => user.isHeadOfFamily).length,
      path: "/e-services/head-family",
    },
    {
      id: 3,
      title: "Registered Voters",
      data: filteredUsers.filter((user) => user.isRegisteredVoter).length,
      path: "/e-services/registered-voters",
    },
    {
      id: 4,
      title: "Male",
      data: filteredUsers.filter((user) => user.sex === "Male").length,
      path: "/e-services/male-residents",
    },
    {
      id: 5,
      title: "Female",
      data: filteredUsers.filter((user) => user.sex === "Female").length,
      path: "/e-services/female-residents",
    },
    {
      id: 6,
      title: "Low Class",
      data: filteredUsers.filter(
        (user) =>
          user.salaryRange === "5,000 below" ||
          user.salaryRange === "5,000 - 10,000" ||
          user.salaryRange === "10,000 and less"
      ).length,
      path: "/e-services/male-residents",
    },
    {
      id: 7,
      title: "Mid Class",
      data: filteredUsers.filter(
        (user) => user.salaryRange === "10,000 - 30,000"
      ).length,
      path: "/e-services/midclass-residents",
    },
    {
      id: 8,
      title: "Upper Class",
      data: filteredUsers.filter((user) => user.salaryRange === "30,000 above")
        .length,
      path: "/e-services/upperclass-residents",
    },
    {
      id: 9,
      title: "Senior",
      data: filteredUsers.filter((user) => {
        const birthDate = new Date(user.birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 60;
      }).length,
      path: "/e-services/senior-citizen-residents",
    },
    {
      id: 10,
      title: "4ps Beneficiary",
      data: filteredUsers.filter((user) => user.is4ps).length,
      path: "/e-services/4ps-benificiary-residents",
    },
  ];

  if (loading) return <Loading />;

  const chartData = contentData.map((item) => ({
    name: item.title,
    total: item.data,
  }));

  return (
    <div className="d-flex justify-content-center">
      <Container className="shadow-lg p-4 rounded-2">
        <h1 className="text-center mb-4 fs-4">
          Accumulated data for{" "}
          {barangay === "default" ? "Dagupan City" : barangay}
        </h1>
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#198754" />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
