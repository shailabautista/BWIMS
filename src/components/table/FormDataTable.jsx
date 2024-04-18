import { Link, useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const FormDataTable = ({ data, category, handleApprove, handleReject }) => {
  const location = useLocation();
  const allowedPaths = [
    "/e-services/barangay-clearance",
    "/e-services/business-permit",
    "/e-services/certificate-of-indigency",
    "/e-services/certificate-of-residency"
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Contact No</th>
          <th>Date</th>
          <th>Status</th>
          <th>Pick Up</th>
          <th>Color</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.lastName}</td>
            <td>{entry.firstName}</td>
            <td>{entry.middleName}</td>
            <td>{entry.contactNo}</td>
            <td>{formatDate(entry.date)}</td>
            <td>{entry.status}</td>
            <td>{entry.pickUp}</td>
            <td>{entry.color}</td>
            <td className="d-flex gap-2">
              <Link className="btn btn-primary" to={!category ? entry._id : `/e-services/${category}/${entry._id}`}>
                View
              </Link>
              {allowedPaths.includes(location.pathname) && (
                <>
                  <Button variant="success" onClick={() => handleApprove(entry._id, entry.userId.email)}>Approve</Button>
                  <Button variant="danger" onClick={() => handleReject(entry._id, entry.userId.email)}>Reject</Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FormDataTable;
