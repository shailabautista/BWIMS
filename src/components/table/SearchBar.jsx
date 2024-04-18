import { InputGroup, FormControl } from "react-bootstrap";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
