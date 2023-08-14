import React, { useState } from "react";
import axios from "axios";

function WeatherSearch() {
  const [location, setLocation] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;

  const locationInput = document.getElementById("location-input");

  const weatherCards = document.querySelector(".weather-cards");
  const currentWeatherCard = document.querySelector(".weather-search-content");

  const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
      return `
        <div class="weather-details">
            <h1>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h1>
            <p>Temp: <strong>${(weatherItem.main.temp - 273.15).toFixed(
              2
            )}°C</strong></p>
                <p>Wind: <strong>${weatherItem.wind.speed} M/S</strong></p>
                <p>Humidity: <strong>${weatherItem.main.humidity}%</strong></p>
        </div>
        <div class="weather-image">
        <img src="https://openweathermap.org/img/wn/${
          weatherItem.weather[0].icon
        }@4x.png" alt="1"> 
           <span>${weatherItem.weather[0].description}</span>
        </div>
        `;
    } else {
      return ` <li class="weather-card">
                <h4>(${weatherItem.dt_txt.split(" ")[0]})</h4>
                <div class="weather-card-img">
                    <img src="https://openweathermap.org/img/wn/${
                      weatherItem.weather[0].icon
                    }@2x.png" alt="1">
                </div>
                <p>Temp: <strong>${(weatherItem.main.temp - 273.15).toFixed(
                  2
                )}°C</strong></p>
                <p>Wind: <strong>${weatherItem.wind.speed} M/S</strong></p>
                <p>Humidity: <strong>${weatherItem.main.humidity}%</strong></p>
            </li>`;
    }
  };

  const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    axios
      .get(WEATHER_API_URL)
      .then((response) => {
        const data = response.data;
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter((forecast) => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDate)) {
            uniqueForecastDays.push(forecastDate);
            return true;
          }
          return false;
        });
        locationInput.value = "";
        weatherCards.innerHTML = "";
        currentWeatherCard.innerHTML = "";
        fiveDaysForecast.forEach((weatherItem, index) => {
          if (index === 0) {
            console.log(createWeatherCard(cityName, weatherItem, index));

            currentWeatherCard.insertAdjacentHTML(
              "beforeend",
              createWeatherCard(cityName, weatherItem, index)
            );
          } else {
            weatherCards.insertAdjacentHTML(
              "beforeend",
              createWeatherCard(cityName, weatherItem, index)
            );
          }
        });
      })
      .catch((err) => {
        alert("An error occurred while fetching weather forecast");
      });
  };

  const getCityCoordinates = () => {
    const cityName = locationInput.value.trim();
    console.log(cityName);
    if (!cityName) return;
    const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    axios
      .get(GEOCODING_API_URL)
      .then((response) => {
        const data = response.data;
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const REVERSE_GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
        axios
          .get(REVERSE_GEOCODING_API_URL)
          .then((response) => {
            const data = response.data;
            const { name } = data[0];
            getWeatherDetails(name, latitude, longitude);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          alert("Geolocation request denied. Please allow location permission");
        }
      }
    );
  };

  const handleSearch = () => {
    // Implement handleSearch logic
    getCityCoordinates();
  };

  const handleLocationInput = (e) => {
    // Implement handleLocationInput logic
    setLocation(e.target.value);
  };

  const searchByUserLocation = (e) => {
    getUserCoordinates();
  }

  return (
    <div className="input-container">
      <div className="input-location">
        <label>Enter a City Name</label>
        <input
          id="location-input"
          type="text"
          placeholder="Eg. New York, London, Nepal"
          value={location}
          onChange={handleLocationInput}
        />
        <button id="search-location" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="hr"></div>
      <div className="your-default">
        <button id="user-location-btn" onClick={searchByUserLocation}>
          Use Current Location
        </button>
      </div>
    </div>
  );
}

export default WeatherSearch;
