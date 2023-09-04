import "./styleBigCities.css";
import PropTypes from "prop-types";

function BigCities({ city, setIsOpenDetail, setDetailCityData }) {
  function getSmallCountry(country) {
    let newArr = [];
    let countries = country.split(" ");

    countries.map((item) => {
      if (item[0] === item[0].toUpperCase()) {
        newArr.push(item[0]);
      }
    });
    let response = newArr.join("");
    return response;
  }

  return (
    <div className="citiesDiv">
      <h3>{city.location.name}</h3>
      <p className="countryText">
        {city.location.country.length > 10
          ? getSmallCountry(city.location.country)
          : city.location.country}
      </p>
      <div>
        <p>Temperature:</p>
        <p className="temperature">{city.current.temp_c} C°</p>
      </div>
      <p className="conditionWeather">{city.current.condition.text}</p>
      <img
        src={city.current.condition.icon}
        alt="icon"
        className="weatherIcon"
      />
      <div className="updateText">
        <p>Last Updated:</p>
        <p>{city.current.last_updated}</p>
      </div>
      <button
        className="detailBtn"
        onClick={() => {
          setIsOpenDetail(true);
          setDetailCityData(city);
        }}
      >
        Show Details
      </button>
    </div>
  );
}

BigCities.propTypes = {
  city: PropTypes.object.isRequired,
  setIsOpenDetail: PropTypes.func,
  setDetailCityData: PropTypes.func,
};

export default BigCities;
