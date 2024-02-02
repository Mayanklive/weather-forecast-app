import React, { useState } from 'react';
import './WeatherDetails.css'; // Import the CSS file
import Forecast from './Forecast';

const WeatherDetails = (props) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnits = () => {
    setIsCelsius((prev) => !prev);
  };

  const temperatureUnit = isCelsius ? '°C' : '°F';

   const convertTemperature = (temp,isCelsius) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <div>
    <div className="weather-details-container">
      <h2>{props.weather.name}</h2>
      <div className="temperature-container">
      <img
        src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`}
        alt="Weather Icon"
      />
        <p className='temperature'>
           {Math.round(convertTemperature(props.weather.main.temp,isCelsius))}
          {temperatureUnit}
        </p>
        <button className="toggle-button" onClick={toggleUnits}>
          {isCelsius ? 'Switch to °F' : 'Switch to °C'}
        </button>
      </div>
      <div className='weather-description'>
      <p>Description: {props.weather.weather[0].description}</p>
      <p>
        H:
        {Math.round(convertTemperature(props.weather.main.temp_max,isCelsius))}
        &deg;  {"   "}  L:{Math.round(convertTemperature(props.weather.main.temp_min,isCelsius))}
         &deg;
      </p>
      <p>Humidity: {props.weather.main.humidity}%</p>
      <p>Wind: {props.weather.wind.speed} m/s, {props.weather.wind.deg}°</p>
      </div>
      
      
    </div>
    <Forecast tempUnit={temperatureUnit}isCelsius={isCelsius} convertTemperature={convertTemperature} forecast={props.forecast} />
    </div>
  );
};

export default WeatherDetails;
