import { useEffect, useRef, useState } from "react";
import useWeather from "../../hooks/useWeather.js";
import useCitySearch from "../../hooks/useCitySearch.js";

import "./styleMainPage.css";
import "../../assets/css/style.css";
import "animate.css";

function MainPage() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);

  const { suggestions, searchloading, searcherror, clearSuggestions } =
    useCitySearch(city);
  const { weather, loading, error } = useWeather(lat, lon);

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

  return (
    <div className="background">
      <div className="container">
        <div className="titleDiv animate__animated animate__fadeInDown">
          <h1 className="bigTitle">Weather Application</h1>
        </div>
        <div className="oneCityDiv">
          <div className="searchDiv" ref={wrapperRef}>
            <input
              className="searchInput"
              value={city}
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
                {searchloading && <div className="loading">Loading...</div>}
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
          <div className="oneCityDiv">
            {loading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {!loading && !error && weather !== null && (
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
