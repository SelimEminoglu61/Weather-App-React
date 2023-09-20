import "./styleSearchTable.css";
import "../DetailCities/styleDetailCities.css";
import PropTypes from "prop-types";

function SearchTable({ searchCity, setIsOpenSearch }) {
  return (
    <div className="searchDiv">
      <div className="closeBtnDiv">
        <button className="headlineBtn" onClick={() => setIsOpenSearch(false)}>
          X
        </button>
      </div>
      <div className="searchTableDiv">
        <div className="leftSide">
          <h2>
            {searchCity.location.name},{searchCity.location.country}
          </h2>
          <img
            className="tableIcon"
            src={searchCity.current.condition.icon}
            alt="logo"
          />
        </div>
        <div className="midSide">
          <div className="infoDiv">
            <p>Temperature: {searchCity.current.temp_c} C°</p>
            <p>Station: {searchCity.current.condition.text}</p>
            <p>Last Updated: {searchCity.current.last_updated}</p>
            <br />
            <p>Feels Like: {searchCity.current.feelslike_c} C°</p>
            <p>Wind Speed: {searchCity.current.wind_kph} kph</p>
            <p>Wind Direction: {searchCity.current.wind_dir}</p>
          </div>
        </div>
        <div className="rightSide">
          <div className="infoDiv">
            <p>Pressure: {searchCity.current.pressure_mb} mb</p>
            <p>Humidity: {searchCity.current.humidity}%</p>
            <p>Cloud: {searchCity.current.cloud}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchTable.propTypes = {
  searchCity: PropTypes.object.isRequired,
  setIsOpenSearch: PropTypes.func.isRequired,
};

export default SearchTable;
