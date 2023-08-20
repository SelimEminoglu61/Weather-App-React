import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import getBigCity from "../../utils/Request";
import "./styleMainPage.css";
import "animate.css";

function MainPage() {
  const bigCities = ["London", "Washington", "Paris", "Roma", "Berlin"];
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(bigCities.map((city) => getBigCity(city)));
      setCityData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="background">
      <div className="container">
        <div className="titleDiv animate__animated animate__fadeInDown">
          <h1 className="bigTitle">Weather Application</h1>
        </div>
        <SearchBar />
        <div>
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
