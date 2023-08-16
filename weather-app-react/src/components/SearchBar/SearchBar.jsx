import { useState } from "react";
import "./styleSearchBar.css";

function SearchBar() {
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <form
      onSubmit={() => {
        e.preventDefault();
        setCity("");
      }}
      className="cityForm"
    >
      <input
        placeholder="Aramak istediğiniz il ismini giriniz"
        className="inputCity"
        value={city}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button type="submit" className="inputBtn">
        Hava Durumunu Göster
      </button>
    </form>
  );
}

export default SearchBar;
