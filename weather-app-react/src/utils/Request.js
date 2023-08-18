import axios from "axios";

function getBigCity(city) {
  const axios = require("axios");

  let weatherİnfo;
  axios
    .get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`
    )
    .then((response) => (response = weatherİnfo));

  return weatherİnfo;
}
