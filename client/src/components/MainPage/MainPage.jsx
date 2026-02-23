import { useState } from "react";
import { takeWeather } from "../../services/weatherGet.js";

import "./styleMainPage.css";
import "../../assets/css/style.css";
import "animate.css";

import useCitySearch from "../../hooks/useCitySearch.js";

function MainPage() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorWeather, setErrorWeather] = useState(null);
  const [oneCityData, setOneCity] = useState({});
  const [weather, setWeather] = useState(null);

  const { suggestions, searchloading, searcherror, clearSuggestions } =
    useCitySearch(city);

  const handleSearch = async (lat, lon) => {
    try {
      setErrorWeather(false);
      const data = await takeWeather(lat, lon);
      setWeather(data);
      clearSuggestions();
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
        <div className="oneCityDiv">
          <div className="searchDiv">
            <input
              className="searchInput"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {searchloading && <div className="loading">Loading...</div>}
            {searcherror && <div className="error">{searcherror}</div>}
            {searcherror === "" && suggestions.length > 0 && (
              <div className="suggestions">
                {city.length >= 3 &&
                  suggestions.map((sug, i) => (
                    <button
                      key={i}
                      className="searchButton"
                      onClick={() => handleSearch(sug.lat, sug.lon)}
                    >
                      {sug.name}, {sug.country}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
        {errorWeather && (
          <div>
            <h2>{errorWeather}</h2>
          </div>
        )}
        {weather && (
          <div className="oneCityDiv">
            {loading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {!loading && !error && oneCityData !== null && (
              <div className="oneCityCard">
                <h2>{weather.name}</h2>
                <p>{weather.main.temp}°C</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
