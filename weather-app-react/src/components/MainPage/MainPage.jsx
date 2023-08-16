import SearchBar from "../SearchBar/SearchBar";
import "./styleMainPage.css";

function MainPage() {
  return (
    <div className="background">
      <div className="container">
        <div className="titleDiv">
          <h1 className="bigTitle">Hava Durumu Uygulaması</h1>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}

export default MainPage;
