import { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import "../src/Style Sheets/App.css";
import CurrentWeather from "./currentWeather";
import ThreeHourForecast from "./threeHourForecast";

function App () {

  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("london");
  const [unit, setUnit] = useState("metric");

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setSubmittedCity(city);
      }
    };

    const handleClick = () => {
      setSubmittedCity(city)
    };

    const handleImperialClick = () => {
      setUnit("imperial");
    };

    const handleMetricClick = () => {
      setUnit("metric");
    };

    const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") =>
      DateTime.fromMillis(secs * 1000).setZone(`UTC${offset >= 0 ? '+' : ''}${offset / 3600}`).toFormat(format);
  
    const formatSunriseSunset = (secs, offset) =>
      DateTime.fromSeconds(secs).setZone(`UTC${offset >= 0 ? '+' : ''}${offset / 3600}`).toFormat('hh:mm a');
  

  return (
    <div className="main">

      <div className="left">
        <img className="search-img" onClick={handleClick} src="../imgs/search.svg" alt="" />
        <input 
          type="text" 
          placeholder="Search for cities"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        /> 
        <h2 className="celcius" onClick={handleMetricClick}>°C</h2>
        <h2 className="vertical-line">&nbsp; | &nbsp;</h2>
        <h2 className="farenhiet" onClick={handleImperialClick}>°F</h2>

        <CurrentWeather city={submittedCity} unit={unit} />
      </div>

      <div className="right">
        <ThreeHourForecast city={submittedCity} unit={unit} />
      </div>

    </div>
  );
};

export default App;