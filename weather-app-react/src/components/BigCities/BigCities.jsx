import "./styleBigCities.css";
import PropTypes from "prop-types";

function BigCities({ city }) {
  return (
    <div>
      <h3>{city.location.name}</h3>
      <p>{city.location.country}</p>
      <p>{city.current.temp_c}</p>
      <p>{city.current.last_updated}</p>
      <p>{city.current.condition.text}</p>
      <img src={city.current.condition.icon} alt="icon" />
    </div>
  );
}

BigCities.propTypes = {
  city: PropTypes.object.isRequired,
};

export default BigCities;
