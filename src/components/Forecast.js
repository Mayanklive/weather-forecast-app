import React from 'react';
import './Forecast.css';

const Forecast = (props) => {
    const groupedForecast = groupForecastByDate(props.forecast.list);
  
    return (
      <div className="table-container">
        <table className="forecast-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Average Temperature ({props.tempUnit}{" "})</th>
              <th>Description</th>
              <th>Weather Image</th>
            </tr>
          </thead>
          <tbody>
            {groupedForecast.map((dayForecast) => (
              <tr key={dayForecast[0].dt}>
                <td>{new Date(dayForecast[0].dt * 1000).toLocaleDateString()}</td>
                <td>{Math.round(props.convertTemperature(calculateAverageTemperature(dayForecast),props.isCelsius))}</td>
                <td>{dayForecast[0].weather[0].description}</td>
                <td>
                  <img
                    src={`http://openweathermap.org/img/wn/${dayForecast[0].weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

// Helper function to group forecast entries by date
const groupForecastByDate = (forecastList) => {
    const groupedForecast = [];
    const processedDates = new Set();
  
    forecastList.forEach((day) => {
      const date = day.dt_txt.split(' ')[0];
  
      if (!processedDates.has(date)) {
        const currentDate = new Date(date);
        const today = new Date();
        
        // Skip the forecast for the current date
        if (currentDate > today) {
          const group = forecastList.filter((d) => d.dt_txt.includes(date));
          groupedForecast.push(group);
        }
  
        processedDates.add(date);
      }
    });
  
    return groupedForecast;
  };
  
  
  

// Helper function to calculate the average temperature
const calculateAverageTemperature = (dayForecast) => {
    const totalTemp = dayForecast.reduce((sum, day) => sum + day.main.temp, 0);
    const averageTemp = totalTemp / dayForecast.length;
    return Math.round(averageTemp); // Round off to the nearest whole number
  };

export default Forecast;


