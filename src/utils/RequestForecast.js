import axios from "axios";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

async function getForecastCity(city) {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&hour=24&key=${apiKey}`
    );

    let forecast = response.data.forecast.forecastday;
    return forecast;
  } catch (err) {
    return err;
  }
}
export default getForecastCity;
