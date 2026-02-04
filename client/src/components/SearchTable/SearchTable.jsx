import { useState, useEffect } from "react";
import getForecastCity from "../../utils/RequestForecast";
import "./styleSearchTable.css";
import "../DetailCities/styleDetailCities.css";
import "../BigCities/styleBigCities.css";
import PropTypes from "prop-types";

function SearchTable({ searchCity, setIsOpenSearch }) {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [forecastCity, setForecastCity] = useState([]);

  const fetchData = async () => {
    const data = await getForecastCity(searchCity.location.name);
    setForecastCity(data);
  };

  useEffect(() => {
    fetchData();
  }, [searchCity]);

  function detailButton() {
    const button = document.getElementById("detailbutton");

    if (isOpenDetail == false) {
      setIsOpenDetail(true);
      button.innerText = "Close Details";
    } else {
      setIsOpenDetail(false);
      button.innerText = "Show Details";
    }
  }

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
          <button
            className="detailBtn"
            id="detailbutton"
            onClick={() => detailButton()}
          >
            Show Details
          </button>
        </div>
      </div>
      {isOpenDetail && (
        <div className="forecastDiv">
          {forecastCity.map((forecast) => {
            return (
              <div className="forecastCard" key={forecast.date_epoch}>
                <p className="forecastText">Date:{forecast.date}</p>
                <div className="forecastMidDiv">
                  <img
                    src={forecast.day.condition.icon}
                    alt="logo"
                    className="iconDetail"
                  />
                  <p className="forecastText">{forecast.day.avgtemp_c} C°</p>
                  <p className="forecastText">{forecast.day.condition.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

SearchTable.propTypes = {
  searchCity: PropTypes.object.isRequired,
  setIsOpenSearch: PropTypes.func.isRequired,
};

export default SearchTable;
