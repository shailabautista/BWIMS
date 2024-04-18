import { useState } from "react";
import { Spinner, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import useFetchData from "../../hooks/useFetchData";
import SearchBar from "../../components/table/SearchBar";
import FormDataTable from "../../components/table/FormDataTable";
import ItemsPerPage from "../../components/table/ItemPerPage";
import Pagination from "../../components/table/Pagination";
import sendEmail from "../../utils/sendEmail";

const CertificateOfResidencyPage = () => {
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const { data: residency, loading } = useFetchData(
    `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/residency`
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = residency
    .filter((user) => user.address.barangay === barangay)
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    .filter((entry) =>
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

  const handleApprove = async (id, email) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/residency/${id}`,
        { status: "approve" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await sendEmail({
        to_email: email,
        subject: "Certificate of Residency Form",
        message: "Congratulations! your requested form was approved!",
      });
      toast.success("Form Approved");
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (id, email) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/forms/residency/${id}`,
        { status: "reject" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await sendEmail({
        to_email: email,
        subject: "Certificate of Residency Form",
        message:
          "Unfortunately, your requested form was rejected as you did not meet the qualifications.",
      });
      toast.success("Form Rejected");
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  return (
    <Container className="mt-4 overflow-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {residency.length === 0 ? (
            <div className="text-center">No data available.</div>
          ) : (
            <>
              <FormDataTable
                data={currentItems}
                handleApprove={handleApprove}
                handleReject={handleReject}
              />

              <div className="d-flex justify-content-between">
                <ItemsPerPage
                  itemsPerPage={itemsPerPage}
                  handleItemsPerPageChange={handleItemsPerPageChange}
                  length={residency.length}
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

export default CertificateOfResidencyPage;
