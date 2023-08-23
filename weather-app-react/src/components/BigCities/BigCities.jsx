import "./styleBigCities.css";
import PropTypes from "prop-types";

function BigCities({ city }) {
  return (
    <div className="citiesDiv">
      <h3>{city.location.name}</h3>
      <p>{city.location.country}</p>
      <div className="midDiv">
        <p>Temperature:</p>
        <p className="temperature">{city.current.temp_c} C°</p>
      </div>
      <p className="conditionWeather">{city.current.condition.text}</p>
      <img
        src={city.current.condition.icon}
        alt="icon"
        className="weatherIcon"
      />
      <div className="midDiv">
        <p>Last Updated:</p>
        <p>{city.current.last_updated}</p>
      </div>
      <button className="detailBtn">Show Details</button>
    </div>
  );
}

BigCities.propTypes = {
  city: PropTypes.object.isRequired,
};

export default BigCities;
