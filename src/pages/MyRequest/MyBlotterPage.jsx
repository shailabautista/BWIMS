import { useState } from "react";
import { Spinner, Container, Table } from "react-bootstrap";
import Cookies from "js-cookie";
import useFetchData from "../../hooks/useFetchData";
import SearchBar from "../../components/table/SearchBar";
import ItemsPerPage from "../../components/table/ItemPerPage";
import Pagination from "../../components/table/Pagination";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MyBlotterPage = () => {
  const userId = Cookies.get("userId");
  const { data: clearanceData, loading } = useFetchData(
    `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/blotter/myForms/${userId}`
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = clearanceData.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
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
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {clearanceData.length === 0 ? (
            <div className="text-center">No data available.</div>
          ) : (
            <>
              <div className="overflow-auto">
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
                  length={clearanceData.length}
                />

                <Pagination
                  totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default MyBlotterPage;
