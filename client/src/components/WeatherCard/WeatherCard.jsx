import { RingLoader } from "react-spinners";
import "./styleWeatherCard.css";

function WeatherCard({
  weather,
  loading,
  error,
  theme,
  isFavorite,
  addFavorite,
  removeFavorite,
}) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  const handleFavorite = () => {
    const city = {
      lat: weather.lat,
      lon: weather.lon,
      name: weather.name,
      country: weather.country,
    };

    isFavorite ? removeFavorite(city) : addFavorite(city);
  };

  return (
    <div className={theme === "light" ? `weatherCardLight` : `weatherCardDark`}>
      {loading && (
        <h2>
          <RingLoader color="#ffffff" size={20} />
        </h2>
      )}
      {error && <h2 className="cardError">{error}</h2>}
      {!loading && !error && weather !== null && (
        <div className="weatherCardContent">
          <div>
            <div className="favDiv">
              <button onClick={handleFavorite}>
                {isFavorite ? (
                  <img
                    src="./icons/star-full.png"
                    alt="fullStar"
                    className="fullStar"
                  />
                ) : (
                  <img src="./icons/star-empty.png" alt="emptyStar" />
                )}
              </button>
            </div>
            <div className="topContent">
              <h2
                className={
                  theme === "light" ? "tempTitleLight" : "tempTitleDark"
                }
              >
                {weather.temp}°
              </h2>
              <div className="weatherState">
                <img src={iconUrl} alt={weather.description} />
              </div>
            </div>
          </div>
          <h2 className="cityName">
            {weather.name}, {weather.country}
          </h2>
          <div className="weatOtherThing">
            <h3>Feels like: {weather.feelsLike}°C</h3>
            <h3>
              Min: {weather.min}°C | Max: {weather.max}°C
            </h3>
            <h3>Humidity: {weather.humidity}%</h3>
            <h3>Wind: {weather.windSpeed} m/s</h3>
            <h3>{weather.description}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
