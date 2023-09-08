import "./styleSearchTable.css";
import "../DetailCities/styleDetailCities.css";
import PropTypes from "prop-types";

function SearchTable({ searchCity, setIsOpenSearch }) {
  return (
    <div className="searchDiv">
      <div className="closeBtnDiv">
        <button className="headlineBtn">X</button>
      </div>
      <div className="leftSide">
        <h2>{searchCity.location.name}</h2>
        <img src={searchCity.current.condition.icon} alt="logo" />
      </div>
    </div>
  );
}

SearchTable.propTypes = {
  searchCity: PropTypes.object.isRequired,
  setIsOpenSearch: PropTypes.func.isRequired,
};

export default SearchTable;
