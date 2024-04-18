import { Button } from "react-bootstrap";

const Pagination = ({ totalPages, currentPage, paginate }) => {
  const maxPagesToShow = 5; 

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (totalPages - endPage < Math.floor(maxPagesToShow / 2)) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className="d-flex justify-content-center">
      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
        <Button
          key={startPage + index}
          variant="success"
          onClick={() => paginate(startPage + index)}
          className={`mx-1 ${startPage + index === currentPage ? "active" : ""}`}
        >
          {startPage + index}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
