const API_KEY = "44e7532dbac7f5bcbeae7e52ba28b907";

const locationInput = document.getElementById("location-input");
const searchLocationButton = document.getElementById("search-location");

const weatherCards = document.querySelector(".weather-cards");
const currentWeatherCard = document.querySelector(".weather-search-content");

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index == 0) {
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

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      locationInput.value = "";
      weatherCards.innerHTML = "";
      currentWeatherCard.innerHTML = "";
      fiveDaysForecast.forEach((weatherItem, index) => {
        if (index == 0) {
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

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch((err) => alert(err));
};

searchLocationButton.addEventListener("click", getCityCoordinates);
