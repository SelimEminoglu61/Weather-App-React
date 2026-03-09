function FavoritesCities({ favoriteCities }) {
  return (
    <div>
      <h1>FavoritesCities</h1>
      {favoriteCities.map((city) => (
        <div key={`${city.lat}-${city.lon}`}>
          <h2>
            {city.name}, {city.country}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default FavoritesCities;
