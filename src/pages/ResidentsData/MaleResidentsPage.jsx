import { useState, useEffect } from "react";
import {
  Spinner,
  Button,
  Container,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const MaleResidentsPage = () => {
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, barangay, userData]);

  const filteredData = userData
    .sort((a, b) => a.lName.localeCompare(b.lName))
    .filter((entry) => {
      const includesSearchTerm = Object.values(entry).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const isBarangayMatch =
        barangay === "default" || entry.address.barangay === barangay;
      const isMale = entry.sex === "Male";

      return includesSearchTerm && isBarangayMatch && isMale;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (totalPages - endPage < Math.floor(maxPagesToShow / 2)) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

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
      fetchData();
    } catch (error) {
      alert("Error deleting user:", error);
    }
  };

  return (
    <Container className="mt-4">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <div className="text-center">No data available.</div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Contact No</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.lName}</td>
                    <td>{entry.fName}</td>
                    <td>{entry.mName}</td>
                    <td>{entry.contactNo}</td>
                    <td>{entry.email}</td>
                    <td>{entry.sex}</td>
                    <td className="d-flex gap-2">
                      <Link
                        className="btn btn-primary"
                        to={`/e-services/user/${entry._id}`}
                      >
                        View
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(entry._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <div className="d-flex justify-content-between">
            <div>
              <label htmlFor="itemsPerPageSelect" className="me-2">
                Items per page:
              </label>
              <select
                id="itemsPerPageSelect"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value={userData.length}>All</option>
              </select>
            </div>

            <div className="h-25 d-flex justify-content-center overflow-auto">
              {Array.from({ length: endPage - startPage + 1 }).map(
                (_, index) => (
                  <Button
                    key={startPage + index}
                    onClick={() => paginate(startPage + index)}
                    className={`mx-1 btn-success ${
                      startPage + index === currentPage ? "active" : ""
                    }`}
                  >
                    {startPage + index}
                  </Button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default MaleResidentsPage;
