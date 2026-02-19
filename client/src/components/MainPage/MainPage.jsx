import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import BigCities from "../BigCities/BigCities";
import SearchTable from "../SearchTable/SearchTable";
import "./styleMainPage.css";
import "../../assets/css/style.css";
import "animate.css";

function MainPage() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const bigCities = ["London", "Washington", "Paris", "Atina", "Berlin"];
  const turkBigCities = ["İstanbul", "İzmir", "Ankara", "Trabzon", "Kocaeli"];
  const oneCity = "İstanbul";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [oneCityData, setOneCity] = useState({});
  const [cityData, setCityData] = useState([]);
  const [turkCityData, setTurkCityData] = useState([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenBigDetail, setIsOpenBigDetail] = useState(false);
  const [detailCityData, setDetailCityData] = useState({});
  const [detailBigCityData, setDetailBigCityData] = useState({});
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchCity, setSearchCity] = useState({});

  const fetchData = async () => {
    const data = await Promise.all(bigCities.map((city) => getBigCity(city)));
    const data2 = await Promise.all(
      turkBigCities.map((city) => getBigCity(city)),
    );
    setCityData(data);
    setTurkCityData(data2);
  };

  async function takeWeather() {
    try {
      setLoading(true);

      let x = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=${apiKey}&units=metric`,
      );

      if (!x.ok) {
        throw new Error("Something went wrong");
      }
      let y = await x.json();

      setOneCity(y);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    takeWeather();
  }, []);

  async function getSearchCity(city) {
    const result = await getBigCity(city);
    setSearchCity(result);
    setIsOpenSearch(true);
  }

  return (
    <div className="background">
      <div className="container">
        <div className="titleDiv animate__animated animate__fadeInDown">
          <h1 className="bigTitle">Weather Application</h1>
        </div>
        <SearchBar getSearchCity={getSearchCity} />
        {isOpenSearch && (
          <SearchTable
            searchCity={searchCity}
            setIsOpenSearch={setIsOpenSearch}
          />
        )}
        <div className="oneCityDiv">
          {loading && <h2>Loading...</h2>}
          {error && <h2>{error}</h2>}
          {!loading && !error && oneCityData !== null && (
            <div className="oneCityCard">
              <h2>
                {oneCityData !== null ? `${oneCityData.name}` : "Loading..."}
              </h2>
              <p>{oneCityData !== null ? `${oneCityData.main.temp}°C` : ""}</p>
              <p>
                {oneCityData !== null ? oneCityData.weather[0].description : ""}
              </p>
            </div>
          )}
        </div>

        <div className="bigCities">
          <h2>Turkey Big Cities's Weather</h2>

          <div className="cities">
            {turkCityData.map((city, i) => (
              <BigCities
                city={city}
                key={i}
                setIsOpenDetail={setIsOpenDetail}
                setDetailCityData={setDetailCityData}
              />
            ))}
          </div>
          {isOpenDetail && (
            <DetailCities
              detailCityData={detailCityData}
              setIsOpenDetail={setIsOpenDetail}
            />
          )}
        </div>
        <div className="bigCities">
          <h2>Big Cities's Weather On World</h2>
          <div className="cities">
            {cityData.map((city, i) => (
              <BigCities
                city={city}
                key={i}
                setIsOpenDetail={setIsOpenBigDetail}
                setDetailCityData={setDetailBigCityData}
              />
            ))}
          </div>
          {isOpenBigDetail && (
            <DetailCities
              detailCityData={detailBigCityData}
              setIsOpenDetail={setIsOpenBigDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
