const ItemsPerPage = ({ itemsPerPage, handleItemsPerPageChange, length }) => {
  return (
    <div className="mb-3">
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
        <option value={length}>All</option>
      </select>
    </div>
  );
};

export default ItemsPerPage;
