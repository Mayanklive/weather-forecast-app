import React, { useState } from 'react';
import axios from 'axios';
import WeatherInput from './components/WeatherInput';
import WeatherDetails from './components/WeatherDetails';
// import Forecast from './Forecast';
import './App.css';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error,setError]=useState(null);

  const getWeather = async (city) => {
    try {
      const apiKey = '77ceb55571f68e3089487ab9040bb5e4';
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setError(null);
    } catch (error) {
      // console.error('Error fetching data:', error);
      setError("An unexpected error occured. Please try again later");
      setWeather(null);
    }
  };

  return (
    <div>
      <WeatherInput getWeather={getWeather} />
      {error?<ErrorPage />:null}
      {weather && <WeatherDetails weather={weather} forecast={forecast}/>}
      {/* {forecast && <Forecast forecast={forecast} />} */}
    </div>
  );
};

export default App;

