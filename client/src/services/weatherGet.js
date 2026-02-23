const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function takeWeather(lat, lon) {
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
