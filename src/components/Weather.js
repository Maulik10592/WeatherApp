// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '8c6e30592e00f77e6d53d6b0a92ef4e6'; // Replace with your actual API key
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const mainBg = document.getElementById('root');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Change to 'imperial' for Fahrenheit
        },
      });

      setWeatherData(response.data);
      mainBg.classList.add("darkBg");

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className='WeatherInputBox'>
      <h1>Today's Weather</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-effect">
          <input className="effect"
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        <button type="submit">Find</button>
      </form>

      {weatherData && (
        <div className='WeatherDataBox'>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p><b>Weather:</b> {weatherData.weather[0].description}</p>
          <p><b>Temperature:</b> {weatherData.main.temp} °C</p>
          <p><b>Humidity:</b> {weatherData.main.humidity}%</p>
          <p><b>Wind Speed:</b> {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;