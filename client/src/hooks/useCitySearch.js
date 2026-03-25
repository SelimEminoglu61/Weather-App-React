import { useEffect, useState, useRef } from "react";

function useCitySearch(guery) {
  const [suggestions, setSuggestions] = useState([]);
  const [searchloading, setLoading] = useState(false);
  const [searcherror, setError] = useState("");
  const controllerRef = useRef(null);

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
        controllerRef.current = new AbortController();
        const req = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${guery}&limit=5&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
          { signal: controllerRef.current.signal },
        );
        const res = await req.json();
        setSuggestions(res);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("City not found");
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controllerRef.current?.abort();
    };
  }, [guery]);

  return { suggestions, searchloading, searcherror, clearSuggestions };
}

export default useCitySearch;
