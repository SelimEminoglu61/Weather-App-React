import { useState } from "react";
import PropTypes from "prop-types";
import "./styleSearchBar.css";

function SearchBar({ getSearchCity }) {
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="cityForm">
      <input
        placeholder="Search City"
        className="inputCity"
        value={city}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        type="submit"
        className="inputBtn"
        onClick={() => {
          getSearchCity(city);
        }}
      >
        Show Weather
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  getSearchCity: PropTypes.func.isRequired,
};

export default SearchBar;
