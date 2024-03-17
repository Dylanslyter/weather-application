const apiKey = 'ea6b0dd025b3bb4d331b523df25926f7'; // Replace with your API key

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('city-input').value;
  fetchWeather(city);
});

function fetchWeather(city) {
  // Fetch current weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      fetchForecast(city);
      addToSearchHistory(city);
    })
    .catch(error => console.error('Error fetching current weather:', error));
}

function fetchForecast(city) {
  // Fetch forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(error => console.error('Error fetching forecast:', error));
}

function displayCurrentWeather(data) {
  // Display current weather data
  const weatherDisplay = document.getElementById('weather-display');
  weatherDisplay.innerHTML = `
    <h2>${data.name}</h2>
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function displayForecast(data) {
  // Display 5-day forecast
  const forecastDisplay = document.getElementById('forecast-display');
  forecastDisplay.innerHTML = '';
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const forecastItem = `
      <div class="forecast-item">
        <p>Date: ${forecast.dt_txt.slice(0, 10)}</p>
        <p>Temperature: ${forecast.main.temp}°C</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind Speed: ${forecast.wind.speed} m/s</p>
      </div>
    `;
    forecastDisplay.innerHTML += forecastItem;
  }
}

function addToSearchHistory(city) {
  // Add city to search history
  const searchHistory = document.getElementById('search-history');
  const searchHistoryItem = document.createElement('span');
  searchHistoryItem.classList.add('search-history-item');
  searchHistoryItem.textContent = city;
  searchHistoryItem.addEventListener('click', () => fetchWeather(city));
  searchHistory.appendChild(searchHistoryItem);
}
