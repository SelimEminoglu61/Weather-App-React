import { useState } from "react";
import "./styleSearchBar.css";

function SearchBar() {
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
      <button type="submit" className="inputBtn">
        Show Weather
      </button>
    </form>
  );
}

export default SearchBar;
