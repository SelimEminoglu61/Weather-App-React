import { useEffect, useState } from "react";
import { takeWeather } from "../../services/weatherGet.js";

import "./styleMainPage.css";
import "../../assets/css/style.css";
import "animate.css";

function MainPage() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorWeather, setErrorWeather] = useState(null);
  const [oneCityData, setOneCity] = useState({});
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    try {
      setErrorWeather(false);
      const data = await takeWeather(city);
      setWeather(data);
    } catch (err) {
      setErrorWeather(err.message);
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="titleDiv animate__animated animate__fadeInDown">
          <h1 className="bigTitle">Weather Application</h1>
        </div>
        <div>
          <input value={city} onChange={(e) => setCity(e.target.value)} />
          <button onClick={handleSearch}>Ara</button>
        </div>
        {errorWeather && (
          <div>
            <h2>{errorWeather}</h2>
          </div>
        )}
        {weather && (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.main.temp}°C</p>
          </div>
        )}

        <div className="oneCityDiv">
          {loading && <h2>Loading...</h2>}
          {error && <h2>{error}</h2>}
          {!loading && !error && oneCityData !== null && (
            <div className="oneCityCard">
              <h2>
                {oneCityData !== null ? `${oneCityData.name}` : "Loading..."}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
