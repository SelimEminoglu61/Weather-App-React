import "./styleFavoritesCities.css";

function FavoritesCities({ favoriteCities, clearFavorites, onSelect }) {
  return (
    <div className="favoritesCities">
      <div>
        <h1>Favorites Cities</h1>
        <button className="clearFavoritesButton" onClick={clearFavorites}>
          Clear Favorites
        </button>
      </div>
      {favoriteCities.map((city) => (
        <div key={`${city.lat}-${city.lon}`}>
          <button onClick={() => onSelect(city.lat, city.lon)}>
            {city.name}, {city.country}
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesCities;
