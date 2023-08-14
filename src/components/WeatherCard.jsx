import React from "react";

function WeatherCard(props) {
  // Extract data from props and display it

  return (
    <div className="weather-cards-container">
      <h3>5-Day Forecast</h3>
      <ul className="weather-cards" id="weather-cards">
        <li className="weather-card">
          <h4>( _______)</h4>
          <p>
            Temp: <strong>___°C</strong>
          </p>
          <p>
            Wind: <strong>___ M/S</strong>
          </p>
          <p>
            Humidity: <strong>__%</strong>
          </p>
        </li>

        <li className="weather-card">
          <h4>( _______)</h4>
          <p>
            Temp: <strong>___°C</strong>
          </p>
          <p>
            Wind: <strong>___ M/S</strong>
          </p>
          <p>
            Humidity: <strong>__%</strong>
          </p>
        </li>
        <li className="weather-card">
          <h4>( _______)</h4>
          <p>
            Temp: <strong>___°C</strong>
          </p>
          <p>
            Wind: <strong>___ M/S</strong>
          </p>
          <p>
            Humidity: <strong>__%</strong>
          </p>
        </li>
        <li className="weather-card">
          <h4>( _______)</h4>
          <p>
            Temp: <strong>___°C</strong>
          </p>
          <p>
            Wind: <strong>___ M/S</strong>
          </p>
          <p>
            Humidity: <strong>__%</strong>
          </p>
        </li>
        <li className="weather-card">
          <h4>( _______)</h4>
          <p>
            Temp: <strong>___°C</strong>
          </p>
          <p>
            Wind: <strong>___ M/S</strong>
          </p>
          <p>
            Humidity: <strong>__%</strong>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default WeatherCard;
