import axios from "axios";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

async function getBigCity(city) {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    return response.data;
  } catch (err) {
    return err;
  }
}

export default getBigCity;
