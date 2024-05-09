import { useState, useEffect } from "react";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import SearchBar from "../../components/table/SearchBar";
import ItemsPerPage from "../../components/table/ItemPerPage";
import Pagination from "../../components/table/Pagination";

const RegisteredAccountsPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const barangay = Cookies.get("barangay");

  useEffect(() => {
    if (role !== "admin") {
      navigate("/e-services/announcements");
      alert("You don't have access here!");
    }
  }, [role]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      alert("Error fetching users:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [token, barangay, users]);

  const handleVerification = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to verified this user!"))
        return;
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/${id}`,
        {
          isVerified: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User verify succesfully!");
      fetchUsers();
    } catch (error) {
      alert("Error deleting user:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this user!")) return;
      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User deleted succesfully!");
      fetchUsers();
    } catch (error) {
      alert("Error deleting user:", error);
    }
  };

  const filteredData = users
    .filter(
      (user) =>
        user.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (user) => barangay === "default" || user.address.barangay === barangay
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Container className="mt-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <div className="overflow-auto">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Access</th>
                <th>Status</th>
                <th>Verified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.reverse().map((user) => (
                <tr key={user._id}>
                  <td>{`${user.lName}, ${user.fName} ${user.mName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.accountStatus}</td>
                  <td>{user.isVerified ? "true" : "false"}</td>
                  <td className="d-flex gap-1">
                    <Link
                      to={`/e-services/user-details/${user._id}`}
                      className="btn btn-primary text-decoration-none"
                    >
                      Details
                    </Link>
                    {!user.isVerified && (
                      <Button
                        variant="success"
                        onClick={() => handleVerification(user._id)}
                      >
                        Verify
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <div className="d-flex justify-content-between">
        <ItemsPerPage
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          length={users.length}
        />
        <Pagination
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </Container>
  );
};

export default RegisteredAccountsPage;
