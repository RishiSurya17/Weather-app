// src/WeatherCard.js

import React from 'react';

const WeatherCard = ({ city, temperature, description }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>{temperature}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default WeatherCard;