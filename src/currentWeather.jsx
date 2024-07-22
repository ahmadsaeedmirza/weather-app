import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import "../src/Style Sheets/currentWeather.css";

function CurrentWeather ({ city , unit }) {

    const [degree, setDegree] = useState("");
    
    useEffect(() => {
        if (unit === "imperial") {
          setDegree("°F");
        } else {
          setDegree("°C");
        }
      }, [unit]);

    const [weather, setWeather] = useState ({
        city: "",
        weather: "",
        description: "",
        icon: "",
        country: "",
        sunrise: "",
        sunset: "",
        timezone: 0,
        temp: "",
        tempMin: "",
        tempMax: "",
        feelsLike: "",
        humidity: "",
        windSpeed: "",
        time: ""
    });
       
    useEffect(() => {
        const fetchWeather = async () => {
            if (city) {
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=${unit}`);
                    const allInfo = response.data;
                    const weatherInfo = allInfo.weather[0]; 
                    console.log(response.data);
                    setWeather({
                        weather: weatherInfo.main,
                        description: weatherInfo.description,
                        icon: weatherInfo.icon,
                        temp: allInfo.main.temp,
                        city: allInfo.name,
                        country: allInfo.sys.country,
                        sunrise: allInfo.sys.sunrise,
                        sunset: allInfo.sys.sunset,
                        timezone: allInfo.timezone,
                        tempMin: allInfo.main.temp_min,
                        tempMax: allInfo.main.temp_max,
                        feelsLike: allInfo.main.feels_like,
                        humidity: allInfo.main.humidity + '%',
                        windSpeed: `${allInfo.wind.speed} ${unit === 'imperial' ? 'm/h' : 'm/s'}`,
                        time: allInfo.dt
                    });
                } catch (error) {
                  console.error("Error fetching weather data:", error);
                }
              }
              
            };
        
            fetchWeather();
          }, [city, unit]);

    const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") =>
        DateTime.fromMillis(secs * 1000).setZone(`UTC${offset >= 0 ? '+' : ''}${offset / 3600}`).toFormat(format);
        
    const formatSunriseSunset = (secs, offset) =>
        DateTime.fromSeconds(secs).setZone(`UTC${offset >= 0 ? '+' : ''}${offset / 3600}`).toFormat('hh:mm a');

    if (!weather.city) {
        return <div></div>; 
    }

    return (
        <div className="current-weather">
            <div className="city-name">
                <div className="city">
                    <h1>{weather.city} </h1>
                    <p className="forecast">{weather.weather} </p>
                    <p className="temp">{weather.temp} {degree}</p>
                    <p className="local-time">{formatToLocalTime(weather.time, weather.timezone)}</p>
                </div>
                
                <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
            </div>
                <p className="local-time-mobile">{formatToLocalTime(weather.time, weather.timezone)}</p>

            <div className="current-weather-details">
                <div className="first-col">
                    <div className="detail"><h2>{weather.description}</h2></div>
                    <div className="feels-like-temp"> <span className="feels-like"> <img src="../imgs/feels-like-white.svg" alt="" /> <h3>Feels Like </h3> </span> <p> {weather.feelsLike} {degree} </p></div>
                </div>
                <div className="second-col">
                    <div className="wind-speed-ms"> <span className="wind-speed"> <img src="../imgs/wind-solid.svg" alt="" /> <h3>Wind Speed</h3> </span> <p> {weather.windSpeed}</p> </div>
                    <div className="humidity-percent"> <span className="humidity"> <img src="../imgs/water-solid.svg" alt="" /> <h3>Humidity</h3> </span> <p>{weather.humidity}</p> </div>
                </div>
                <div className="third-col">
                    <div className="sunrise-time"> <span className="sunrise"> <img src="../imgs/sun-solid.svg" alt="" /> <h3>Sunrise</h3> </span> <p>{formatSunriseSunset(weather.sunrise, weather.timezone)}</p> </div>
                    <div className="sunset-time"> <span className="sunset"> <img src="../imgs/sun-solid.svg" alt="" /> <h3>Sunset</h3> </span> <p>{formatSunriseSunset(weather.sunset, weather.timezone)}</p> </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;