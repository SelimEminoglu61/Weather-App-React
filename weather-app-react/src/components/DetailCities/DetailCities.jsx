import "./styleDetailCities.css";
import PropTypes from "prop-types";

function DetailCities({ detailCityData, setIsOpenDetail }) {
  return (
    <div className="detailDiv">
      <div className="headlineDiv">
        <h2 className="headlineText">{detailCityData.location.name}</h2>
        <button className="headlineBtn" onClick={() => setIsOpenDetail(false)}>
          X
        </button>
      </div>
    </div>
  );
}

DetailCities.propTypes = {
  detailCityData: PropTypes.object.isRequired,
  setIsOpenDetail: PropTypes.func.isRequired,
};

export default DetailCities;
