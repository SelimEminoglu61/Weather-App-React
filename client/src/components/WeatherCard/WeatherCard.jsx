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
          <div className="favDiv">
            <button
              onClick={() => {
                isFavorite ? removeFavorite(weather) : addFavorite(weather);
              }}
            >
              {isFavorite ? "⭐ Remove Favorite" : "☆ Add Favorite"}
            </button>
          </div>
          <div className="topContent">
            <h2>
              {weather.name}, {weather.country}
            </h2>
            <div className="weatherState">
              <img src={iconUrl} alt={weather.description} />
              <h2>{weather.temp}°C</h2>
            </div>
          </div>

          <h3>Feels like: {weather.feelsLike}°C</h3>
          <h3>
            Min: {weather.min}°C | Max: {weather.max}°C
          </h3>
          <h3>Humidity: {weather.humidity}%</h3>
          <h3>Wind: {weather.windSpeed} m/s</h3>
          <h3>{weather.description}</h3>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
