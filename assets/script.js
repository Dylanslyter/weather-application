let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

const apiKey = 'ea6b0dd025b3bb4d331b523df25926f7'; // Replace with your API key

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('city-input').value;
  fetchWeather(city);
});
// Function to load search history from local storage
function loadSearchHistory() {

  // Get the element where search history will be displayed
  const searchHistoryContainer = document.getElementById('search-history');

  // Clear existing content
  searchHistoryContainer.innerHTML = '';

  // Iterate through each city in the search history
  searchHistory.forEach(city => {
    // Create a clickable option for each city
    const cityOption = document.createElement('div');
    cityOption.textContent = city;
    cityOption.classList.add('search-history-item');
    
    // Add click event listener to perform search when clicked
    cityOption.addEventListener('click', function() {
      fetchWeather(city);
    });
    
    // Append the city option to the search history container
    searchHistoryContainer.appendChild(cityOption);
  });
}

// Call the function to load and display search history when the page loads
loadSearchHistory();
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
  
  console.log(data.weather[0].main)
  const weatherStatis = data.weather[0].icon
  const weatherDisplay = document.getElementById('weather-display');
  weatherDisplay.innerHTML = `
  <img src = "https://openweathermap.org/img/wn/${weatherStatis}@2x.png"/>
  
    <h2>${data.name}</h2>
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function displayForecast(data) {
  // Display 5-day forecast
  console.log(data)
  const forecastDisplay = document.getElementById('forecast-display');
  forecastDisplay.innerHTML = '';
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const weatherStatis = forecast.weather[0].icon
    const forecastItem = `
      <div class="forecast-item">
      <img src = "https://openweathermap.org/img/wn/${weatherStatis}@2x.png"/>
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
    // Load search history from local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    // Check if the city already exists in the search history
    if (!searchHistory.includes(city)) {
      // Add city to search history if it's not already present
      searchHistory.push(city);
      // Update local storage with the updated search history
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }
