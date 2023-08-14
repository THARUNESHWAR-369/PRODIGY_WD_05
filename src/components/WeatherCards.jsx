import React from "react";
import WeatherCard from "./WeatherCard";
import WeatherLongCard from "./WeatherLongCard";

function WeatherCards() {
  // Get forecast data from props or state

  return (
    <div className="weather-container">
      <div className="weather-content">
        <div className="weather-search-container">
          <div className="weather-search-content">
            <WeatherLongCard/>
          </div>
        </div>
        <WeatherCard/>
      </div>
    </div>
  );
}

export default WeatherCards;
