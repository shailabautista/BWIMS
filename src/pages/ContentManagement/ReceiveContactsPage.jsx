import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import ContactModal from "../../components/ContactModal";
import SearchBar from "../../components/table/SearchBar";
import ItemsPerPage from "../../components/table/ItemPerPage";
import Pagination from "../../components/table/Pagination";
import axios from "axios";
const ReceiveContactsPage = () => {
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const { data: contactData, loading } = useFetchData(
    `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/contacts`
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  const filteredData = contactData
    ? contactData
        .sort((a, b) => a.lName.localeCompare(b.lName))
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

  const handleShowModal = (email) => {
    setShowModal(true);
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmail("");
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this contact!"))
        return;
      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Contact deleted succesfully!");
    } catch (error) {
      alert("Error deleting user:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="overflow-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry, index) => (
              <tr key={index}>
                <td>{entry.lName}</td>
                <td>{entry.fName}</td>
                <td>{entry.email}</td>
                <td>{entry.phoneNumber}</td>
                <td>{entry.message}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="success"
                    onClick={() => handleShowModal(entry.email)}
                  >
                    Send Message
                  </Button>
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
          length={contactData.length}
        />

        <Pagination
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      
      <ContactModal
        show={showModal}
        handleClose={handleCloseModal}
        email={selectedEmail}
      />
    </Container>
  );
};

export default ReceiveContactsPage;
