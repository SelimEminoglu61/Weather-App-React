import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce.js";
import useWeather from "../../hooks/useWeather.js";
import useCitySearch from "../../hooks/useCitySearch.js";

import { RingLoader } from "react-spinners";

import "./styleMainPage.css";
import "../../assets/css/style.css";
import "animate.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import { use } from "react";

function MainPage() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [city, setCity] = useState("");
  const debounceCity = useDebounce(city, 400);

  const weatherIstanbul = useWeather(41.0082, 28.9784);
  const weatherLondon = useWeather(51.5074, -0.1278);
  const weatherNY = useWeather(40.7128, -74.006);
  const weatherTokyo = useWeather(35.6762, 139.6503);
  const weatherParis = useWeather(48.8566, 2.3522);

  const defaultWeather = [
    { name: "Istanbul", data: weatherIstanbul },
    { name: "London", data: weatherLondon },
    { name: "New York", data: weatherNY },
    { name: "Tokyo", data: weatherTokyo },
    { name: "Paris", data: weatherParis },
  ];
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);

  const { suggestions, searchloading, searcherror, clearSuggestions } =
    useCitySearch(debounceCity);
  const { weather, loading, error } = useWeather(lat, lon);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex]);

  const handleSearch = async (lat, lon) => {
    setLat(lat);
    setLon(lon);
    clearSuggestions();
    setIsOpen(false);
  };

  function getBackgroundClass(weather) {
    if (!weather) return "background";
    console.log(weather);
    const main = weather.main.toLowerCase();
    if (main.includes("cloud")) return "background cloudy";
    if (main.includes("rain") || main.includes("drizzle"))
      return "background rainy";
    if (main.includes("snow")) return "background snowy";
    if (main.includes("clear")) return "background clear";
    return "background";
  }

  return (
    <div className={getBackgroundClass(weather)}>
      <header className={theme}>
        <div className="titleDiv animate__animated animate__fadeInDown">
          <h1 className="bigTitle">Weather Application</h1>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
            />
            <span className="slider round">
              <img
                src={
                  theme === "light" ? "./icons/light.png" : "./icons/dark.png"
                }
                alt="theme icon"
                className="theme-icon"
              />
            </span>
          </label>
        </div>
      </header>
      <div className="container">
        <div className="oneCityDiv">
          <div className="searchDiv" ref={wrapperRef}>
            <input
              className="searchInput"
              value={city}
              placeholder="Please enter city name"
              onChange={(e) => {
                const value = e.target.value;
                setCity(value);
                if (value.length >= 3) {
                  setIsOpen(true);
                } else {
                  setIsOpen(false);
                }
              }}
              onKeyDown={(e) => {
                if (!isOpen) return;

                if (e.key === "ArrowDown") {
                  setHighlightIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev,
                  );
                } else if (e.key === "ArrowUp") {
                  setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
                } else if (e.key === "Enter") {
                  if (highlightIndex >= 0) {
                    const city = suggestions[highlightIndex];
                    setLat(city.lat);
                    setLon(city.lon);
                    setIsOpen(false);
                    setHighlightIndex(-1);
                  }
                } else if (e.key === "Escape") {
                  setIsOpen(false);
                  setHighlightIndex(-1);
                }
              }}
            />
            {isOpen && (
              <div className="dropDown">
                {searchloading && (
                  <div className="loading">
                    <RingLoader color="#ffffff" size={20} />
                  </div>
                )}
                {searcherror && <div className="error">{searcherror}</div>}
                {suggestions.length === 0 && city.length >= 3 && (
                  <div className="noResults">No results found</div>
                )}
                {searcherror === "" && suggestions.length > 0 && (
                  <div className="suggestions">
                    {city.length >= 3 &&
                      suggestions.map((sug, i) => (
                        <button
                          key={i}
                          ref={(el) => (itemRefs.current[i] = el)}
                          onMouseDown={() => handleSearch(sug.lat, sug.lon)}
                          className={
                            highlightIndex === i ? "highlight" : "searchButton"
                          }
                        >
                          {sug.name}, {sug.country}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {weather && (
          <WeatherCard
            weather={weather}
            loading={loading}
            error={error}
            theme={theme}
          />
        )}
        <div className="defaultCities">
          {defaultWeather.map((city) => {
            if (!city.data.weather)
              return <div key={city.name}>Loading {city.name}...</div>;
            return <WeatherCard key={city.name} {...city.data} theme={theme} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
