import { useEffect, useState } from "react";

function useCitySearch(guery) {
  const [suggestions, setSuggestions] = useState([]);
  const [searchloading, setLoading] = useState(false);
  const [searcherror, setError] = useState("");

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  useEffect(() => {
    if (guery.length < 3) {
      setSuggestions([]);
      return;
    }

    setSuggestions([]);

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const req = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${guery}&limit=5&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
        );
        const res = await req.json();
        setSuggestions(res);
      } catch (err) {
        setError("City not found");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [guery]);

  return { suggestions, searchloading, searcherror, clearSuggestions };
}

export default useCitySearch;
