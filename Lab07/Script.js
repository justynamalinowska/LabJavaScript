const apiKey = "bde12d6b44697b48b91562cebf1710f6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const updateInterval = 5 * 60 * 1000;
const myModal = document.getElementById("myModal");
const messageElement = document.getElementById("message");

document.addEventListener("DOMContentLoaded", function () {
  loadWeatherData();
  setInterval(() => {
    loadWeatherData();
  }, updateInterval);
});

document.getElementById("openDialog").addEventListener("click", () => {
  myModal.classList.add("visible");
});

document.getElementById("exit").addEventListener("click", function () {
  myModal.classList.remove("visible");
  clearMessage();
});

document.getElementById("cityForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  if (city) {
    addCity(city);
    document.getElementById("city").value = "";
    myModal.classList.remove("visible");
  }
});

document.getElementById("clearStorage").addEventListener("click", () => {
  localStorage.clear();
  document.getElementById("cities").innerHTML = "";
});

function addCity(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (cities.length >= 10) {
    displayMessage("You can only add up to 10 cities.");
    return;
  }
  if (cities.includes(city)) {
    displayMessage("City already exists.");
    return;
  } else {
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    fetchWeatherData(city);
    clearMessage();
  }
}

function fetchWeatherData(city) {
  fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      cacheWeatherData(city, data);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function cacheWeatherData(city, data) {
  const timestamp = new Date().getTime();
  const cachedData = { data, timestamp };
  localStorage.setItem(city, JSON.stringify(cachedData));
}

function displayWeather(data) {
  const id = data.id;
  let cityCard = document.getElementById(id);

  if (!cityCard) {
    cityCard = document.createElement("div");
    cityCard.id = id;
    cityCard.className = "city-card";
    document.getElementById("cities").appendChild(cityCard);
  }

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  cityCard.innerHTML = `
      <h3>${data.name}</h3>
      <div id='binContainer'><img id="bin${id}" src="Images/bin.png" alt="Bin"></div>
      <p><img src="${iconUrl}" alt="${data.weather[0].description}"></p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>${data.weather[0].description}</p>
    `;

  const bin = document
    .getElementById("bin" + id)
    .addEventListener("click", function () {
      deleteCity(data.name, id);
    });
}

function loadWeatherData() {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  const now = new Date().getTime();
  document.getElementById("cities").innerHTML = "";
  cities.forEach((city) => {
    const cachedData = JSON.parse(localStorage.getItem(city));
    if (cachedData && now - cachedData.timestamp < updateInterval)
      displayWeather(cachedData.data);
    else fetchWeatherData(city);
  });
}

function displayMessage(message) {
  messageElement.innerText = message;
  setTimeout(clearMessage, 1500);
}

function clearMessage() {
  messageElement.textContent = "";
}

function deleteCity(city, id) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities = cities.filter((c) => c !== city);
  localStorage.setItem("cities", JSON.stringify(cities));
  localStorage.removeItem(city);
  document.getElementById(id).remove();
}
