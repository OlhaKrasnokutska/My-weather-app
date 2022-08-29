let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = "0" + currentMin;
  } else {
    currentMin = currentMin + "";
  }

  let currentHour = date.getHours();
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentHour}:${currentMin} ${currentDay}, ${currentDate}/${currentMonth}/${currentYear}`;

  return formattedDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-lg-1 col-md-3 card-body day">
    <h5 class="card-title">${formatDay(forecastDay.dt)}<br />
    </h5>
      <p class="card-text">
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="90"/>
        <br />
        <span id="maxTemp">${Math.round(forecastDay.temp.max)}° </span>
        <br />
        <span id="minTemp">${Math.round(forecastDay.temp.min)}°</span>
        <br />
      </p>
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7497a8195f7315d98b24229058ab6f42";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  let input = document.querySelector("#searchCity");
  let date = document.querySelector("#cDate");
  let apiKey = `7497a8195f7315d98b24229058ab6f42`;

  event.preventDefault();
  let resultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(resultUrl).then(currentTemperature);
  let currentTime = new Date();
  date.innerHTML = `${formatDate(currentTime)}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cTemp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsium(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#cTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let signUp = document.querySelector("#submit");
signUp.addEventListener("click", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsium);
let celsiusTemperature = null;

function currentTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let startTemp = document.querySelector("#cTemp");
  startTemp.innerHTML = Math.round(response.data.main.temp);
  let startCity = document.querySelector("#cCity");
  startCity.innerHTML = response.data.name;
  let sEmoji = document.querySelector("#cEmoji");
  sEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description = document.querySelector("#cDescription");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  getForecast(response.data.coord);
}

function logPosition(position) {
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let apiKey = `7497a8195f7315d98b24229058ab6f42`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}
&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentTemperature);
}

navigator.geolocation.getCurrentPosition(logPosition);
displayForecast();
