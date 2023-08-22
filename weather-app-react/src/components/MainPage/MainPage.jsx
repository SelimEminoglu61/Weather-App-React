import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import BigCities from "../BigCities/BigCities";
import getBigCity from "../../utils/Request";
import "./styleMainPage.css";
import "animate.css";

function MainPage() {
  const bigCities = ["London", "Washington", "Paris", "Roma", "Berlin"];
  const turkBigCities = ["İstanbul", "İzmir", "Ankara", "Trabzon", "Kocaeli"];
  const [cityData, setCityData] = useState([]);
  const [turkCityData, setTurkCityData] = useState([]);

  const fetchData = async () => {
    const data = await Promise.all(bigCities.map((city) => getBigCity(city)));
    const data2 = await Promise.all(
      turkBigCities.map((city) => getBigCity(city))
    );
    setCityData(data);
    setTurkCityData(data2);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="background">
      <div className="container">
        <div className="titleDiv animate__animated animate__fadeInDown">
          <h1 className="bigTitle">Weather Application</h1>
        </div>
        <SearchBar />
        <div className="bigCities">
          <h2>Turkey Big Cities's Weather</h2>
          {turkCityData.map((city, i) => (
            <BigCities city={city} key={i} />
          ))}
        </div>
        <div className="bigCities">
          <h2>Big Cities's Weather On World</h2>
          {cityData.map((city, i) => (
            <div key={i}>
              <h2>{city.location.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
