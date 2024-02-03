const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("entered-city");
const card = document.getElementById("card");
const apikey = "967e4fb0027e130463730be178724e3e";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayError(error.message);
    }
  } else {
    displayError("Please enter a correct city");
  }
});

async function getWeatherData(city) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(api);

  if (!response.ok) throw new Error("Please enter a correct city");

  return response.json();
}

function displayWeatherData(weatherData) {
  const { name: city, main: { temp, humidity }, weather: [{ description }] } = weatherData;

  card.innerHTML = `
    <h1 class="cityDisplay">${city}</h1>
    <p class="tempDisplay">Temperature: ${(temp - 273.15).toFixed(1)}°C</p>
    <p class="humidityDisplay">Humidity: ${humidity}%</p>
    <p class="description">Description: ${description}</p>
  `;

  card.style.display = "flex";
}

function displayError(message) {
  card.innerHTML = `<p class="errorDisplay">${message}</p>`;
  card.style.display = "flex";
}
