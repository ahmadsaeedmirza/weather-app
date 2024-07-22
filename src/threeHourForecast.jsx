import React from "react";
import ReactDOM from "react-dom/client";
import axios, { formToJSON } from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import "./Style Sheets/threeHourForecast.css";

function ThreeHourForecast ({city, unit}) {

    const [weather, setWeather] = useState({
        timezone: 0,
        forecasts: []
      });

    const [degree, setDegree] = useState("");
    
    useEffect(() => {
        if (unit === "imperial") {
            setDegree("°F");
        } else {
            setDegree("°C");
        }
    }, [unit]);

    useEffect(() => {
        const fetchWeather = async () => {
            if (city) {
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=${unit}`); 
                    const cityData = response.data.city;
                    const forecasts = response.data.list
          
            setWeather({
                timezone: cityData.timezone,
                forecasts: forecasts 
            });
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                }
            }
        };

        fetchWeather();
    }, [city, unit]);

    const formatToLocalTime = (secs, offset) =>
        DateTime.fromMillis(secs * 1000).setZone(`UTC${offset >= 0 ? '+' : ''}${offset / 3600}`).toFormat('hh:mm a');
    
    const formatSunriseSunset = (secs, offset) =>
        DateTime.fromSeconds(secs).setZone(`UTC${offset >= 0 ? '+' : ''}${offset / 3600}`).toFormat('hh:mm a');


    return(
        <div className="three-hours">

        {weather.forecasts.slice(0,6).map((forecast, index) => (

        <div className="outer">
            <div key={index} className="one">
                <p>{formatToLocalTime(forecast.dt, weather.timezone)}</p>
                <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="weather icon"></img>
                <p>{forecast.main.temp} {degree}</p>
            </div>
            <div className={index === 5 ? "line hidden" : "line"}></div>
        </div>
            

      ))}
        </div>
    );

};

export default ThreeHourForecast; 



{/* <div className="city-info">
            <h1>{weather.city} {weather.country}</h1>
            {weather.sunrise && weather.sunset && (
          <div>
            <p>Sunrise: {formatSunriseSunset(weather.sunrise, weather.timezone)}</p>
            <p>Sunset: {formatSunriseSunset(weather.sunset, weather.timezone)}</p>
          </div>
        )}
            {weather.forecasts.length > 0 && (
          <div>
            {weather.forecasts.map((forecast, index) => (
              <div key={index}>
                <h2>{formatToLocalTime(forecast.dt, weather.timezone)}</h2>
                <h2>{localTime}</h2>
                <p>Temperature: {forecast.main.temp}°C</p>
                <p>Feels Like: {forecast.main.feels_like}°C</p>
                <p>Weather: {forecast.weather[0].main} <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="" /> </p>
                <p>Wind Speed: {forecast.wind.speed} m/s</p>
                <p>Min Temperature: {forecast.main.temp_min}°C</p>
                <p>Max Temperature: {forecast.main.temp_max}°C</p>
                <p>Humidity: {forecast.main.humidity}%</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>  */}