import { useState } from "react";
import { Spinner, Container } from "react-bootstrap";
import Cookies from "js-cookie";
import useFetchData from "../../hooks/useFetchData";
import SearchBar from "../../components/table/SearchBar";
import FormDataTable from "../../components/table/FormDataTable";
import ItemsPerPage from "../../components/table/ItemPerPage";
import Pagination from "../../components/table/Pagination";

const MyBarangayClearancePage = () => {
  const userId = Cookies.get("userId");
  const { data: clearanceData, loading } = useFetchData(
    `${
      import.meta.env.VITE_BWIMS_API_KEY
    }/api/forms/barangayClearance/myForms/${userId}`
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
              <FormDataTable
                data={currentItems}
                category="barangay-clearance"
              />

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

export default MyBarangayClearancePage;
