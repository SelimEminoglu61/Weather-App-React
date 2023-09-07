import { useEffect, useState } from "react";
import getForecastCity from "../../utils/RequestForecast";
import "./styleDetailCities.css";
import PropTypes from "prop-types";

function DetailCities({ detailCityData, setIsOpenDetail }) {
  let currentData = detailCityData.current;

  const [forecastCity, setForecastCity] = useState([]);

  const fetchData = async () => {
    const data = await getForecastCity(detailCityData.location.name);
    setForecastCity(data);
  };

  useEffect(() => {
    fetchData();
  }, [detailCityData]);

  return (
    <div className="detailDiv">
      <div className="headlineDiv">
        <h2 className="headlineText">{detailCityData.location.name}</h2>
        <button className="headlineBtn" onClick={() => setIsOpenDetail(false)}>
          X
        </button>
      </div>
      <div className="midDiv">
        <div className="tableDiv">
          <div className="tableColumn border-right">
            <p className="row">Feels like tempature(C°)</p>
            <p className="row">Wind speed kph</p>
            <p className="row">Wind direction</p>
            <p className="row">Pressure mb(milibars)</p>
            <p className="row">Humidity(%)</p>
            <p className="row">Cloud(%)</p>
            <p className="row none-border">Wind gust kph</p>
          </div>
          <div className="tableColumn">
            <p className="row">{currentData.feelslike_c}</p>
            <p className="row">{currentData.wind_kph}</p>
            <p className="row">{currentData.wind_dir}</p>
            <p className="row">{currentData.pressure_mb}</p>
            <p className="row">{currentData.humidity}</p>
            <p className="row">{currentData.cloud}</p>
            <p className="row none-border">{currentData.gust_kph}</p>
          </div>
        </div>
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
      </div>
    </div>
  );
}

DetailCities.propTypes = {
  detailCityData: PropTypes.object.isRequired,
  setIsOpenDetail: PropTypes.func.isRequired,
};

export default DetailCities;
