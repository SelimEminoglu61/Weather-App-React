import { useState, useEffect } from "react";

function useWeather(lat, lon) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat === null || lon === null) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        setWeather(null);

        const req = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
        );

        if (!req.ok) {
          throw new Error("Weather alınamadı");
        }

        const data = await req.json();
        const normalizedData = {
          name: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          min: data.main.temp_min,
          max: data.main.temp_max,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
        };
        setWeather(normalizedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lon]);
  return { weather, loading, error };
}

export default useWeather;
