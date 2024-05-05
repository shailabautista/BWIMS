import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import SearchBar from "../../components/table/SearchBar";
import ItemsPerPage from "../../components/table/ItemPerPage";
import Pagination from "../../components/table/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import sendEmail from "../../utils/sendEmail";
import axios from "axios";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const BlotterPage = () => {
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const { data: blotterData, loading } = useFetchData(
    `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/blotter`
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = blotterData
    ? blotterData
        .filter((user) => user.userId.address.barangay === barangay)
        .sort((a, b) => a.lastName.localeCompare(b.lName))
        .filter((entry) =>
          Object.values(entry).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleApprove = async (id, email) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/blotter/${id}`,
        { status: "approve" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await sendEmail({
        to_email: email,
        subject: "Blotter Form",
        message: "Congratulations! your requested form was approved!",
      });
      toast.success("Form Approved");
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (id, email) => {
    try {
      if (!window.confirm("Are you sure you want to reject  this?")) return;

      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/blotter/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await sendEmail({
        to_email: email,
        subject: "Blotter Form",
        message:
          "Unfortunately, your requested form was rejected as you did not meet the qualifications.",
      });

      toast.success("Form Rejected");
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this?")) return;
      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/blotter/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blotter deleted succesfully!");
    } catch (error) {
      alert("Error deleting user:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className=" overflow-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Contact No</th>
              <th>Age</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry, index) => (
              <tr key={index}>
                <td>{entry.lastName}</td>
                <td>{entry.firstName}</td>
                <td>{entry.middleName}</td>
                <td>{entry.contactNo}</td>
                <td>{entry.age}</td>
                <td>{formatDate(entry.date)}</td>
                <td>{entry.status}</td>
                <td className="d-flex gap-2">
                  <Link
                    className="btn btn-primary"
                    to={`/e-services/blotter/${entry._id}`}
                  >
                    View
                  </Link>
                  <>
                    <Button
                      variant="success"
                      onClick={() =>
                        handleApprove(entry._id, entry.userId.email)
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleReject(entry._id, entry.userId.email)
                      }
                    >
                      Reject
                    </Button>
                  </>
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
      </div>
      <div className="d-flex justify-content-between">
        <ItemsPerPage
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          length={blotterData.length}
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

export default BlotterPage;
