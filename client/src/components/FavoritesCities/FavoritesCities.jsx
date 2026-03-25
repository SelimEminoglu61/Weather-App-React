import React from "react";
import "./styleFavoritesCities.css";

function FavoritesCities({
  favoriteCities,
  clearFavorites,
  onSelect,
  theme,
  removeFavorite,
}) {
  return (
    <div
      className={
        theme === "light" ? "favoritesCitiesLight" : "favoritesCitiesDark"
      }
    >
      <div>
        <h1>Favorites Cities</h1>
        <div className="clearFavoriteDiv">
          <button className="clearFavoritesButton" onClick={clearFavorites}>
            Clear Favorites
          </button>
        </div>
      </div>
      {favoriteCities.length === 0 ? (
        <div className={theme === "light" ? "emptyListLight" : "emptyListDark"}>
          <h2 className="favoriteTitle">Favorite Cities List is empty.</h2>
        </div>
      ) : (
        <div>
          {favoriteCities.map((city, i) => (
            <div className="favoritesList" key={`${city.lat}-${city.lon}`}>
              <p className="favoriteListNumber">{i + 1}-</p>
              <button
                className="favoritesCityButton"
                onClick={() => onSelect(city.lat, city.lon)}
              >
                {city.name}, {city.country}
              </button>
              <button
                className="removeCityButton"
                onClick={() => removeFavorite(city)}
              >
                <img src="/icons/remove.png" alt="removeFavorite" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(FavoritesCities);
