// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './WeatherCard';

const App = () => {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'e5a6d66a5bbe4ba180675925252403'; // Replace with your actual API key

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);  // Reset error

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);  // Set weather data from the API response
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data when city changes
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}  // Update city on input change
        placeholder="Enter city"
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Display weather data if available */}
      {weatherData && !loading && !error && (
        <WeatherCard
          city={weatherData.location.name}
          temperature={weatherData.current.temp_c}
          description={weatherData.current.condition.text}
        />
      )}
    </div>
  );
};

export default App;