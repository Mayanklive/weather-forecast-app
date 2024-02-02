import React, { useState } from 'react';
import './WeatherInput.css';

const WeatherInput = ({ getWeather }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <nav className='nav-bar'>
        <div className='nav-left'>
            <h1>Weather</h1>
        </div>
    <div className='nav-right'>    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=" Enter City Name "
        value={city}
        onChange={handleInputChange}
      />
      <button className="search-button" type="submit">Search</button>
    </form>
    </div>
    </nav>
  );
};

export default WeatherInput;