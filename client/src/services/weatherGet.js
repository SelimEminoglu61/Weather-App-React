const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function takeWeather(city) {
  // Geocoding
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
  );

  const geoData = await geoRes.json();

  if (!geoData.length) {
    throw new Error("Şehir bulunamadı");
  }

  const { lat, lon } = geoData[0];

  // Weather Data

  let x = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
  );

  if (!x.ok) {
    throw new Error("Something went wrong");
  }
  let y = await x.json();

  return y;
}
