"use strict";

// Selectors
const input = document.querySelector("#search-input");
const icon = document.getElementById("icon");
const btnSearch = document.querySelector("#search-button");
const middleDiv = document.querySelector("#middle-div");
const bottomDiv = document.querySelector("#bottom-div");

const updateWeather = function (apiData) {
  if (apiData.cod === "404") {
    input.value = "";
    input.placeholder = "City not found!";
    return;
  }

  const markupBottom = `<div id="bottom-div">
    <div class="humidity-div">
      <img
        id="humidity-icon"
        src="./assets/humidity.png"
        alt="humidity icon"
      />
      <p id="humidity-level">${apiData.main.humidity}% <span>Humidity</span></p>
    </div>

    <div class="wind-speed-div">
      <img src="./assets/wind.png" alt="wind-speed" id="wind-speed-icon" />
      <p id="wind-speed-level">${apiData.wind.speed.toFixed(
        2
      )}km/hr <span>Wind Speed</span></p>
    </div>
  </div>`;

  const markupMiddle = `<div id="middle-div">
    <img id="icon" src="./assets/${
      apiData.weather[0].main
    }.png" alt="weather condition" />
    <p id="degree">${Math.round(apiData.main.temp - 273.15)}°C</p>
    <p id="city">${apiData.name}</p>
  </div>
</div>`;

  input.value = "";
  bottomDiv.innerHTML = markupBottom;
  middleDiv.innerHTML = markupMiddle;
};

async function fetchData(city) {
  try {
    const cityName = city.toLowerCase().replace(" ", "");

    const response =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=77b6e7e0f0e0731e8b5f8e56c7ce53f8
`);

    console.log(response);

    const data = await response.json();

    console.log(data);

    updateWeather(data);

    return data;
  } catch (err) {
    console.log(err);

    input.placeholder = "Error! Try again after some time";
  }
}

btnSearch.addEventListener("click", function () {
  const cityName = input.value;

  if (!cityName) return;

  fetchData(cityName);
});

input.addEventListener("keypress", function (e) {
  const cityName = input.value;

  if (e.key === "Enter") {
    if (!cityName) return;
    fetchData(cityName);
  }
});
