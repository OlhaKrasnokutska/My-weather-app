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

  let formattedDate = `${currentHour}:${currentMin} <br/> ${currentDay}, ${currentDate}/${currentMonth}/${currentYear}`;

  return formattedDate;
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
  temperatureElement.innerHTML = 66;
}

function convertToCelsium(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cTemp");
  temperatureElement.innerHTML = 19;
}

let signUp = document.querySelector("#submit");
signUp.addEventListener("click", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiumLink = document.querySelector("#celsius-link");
celsiumLink.addEventListener("click", convertToCelsium);

function currentTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let startTemp = document.querySelector("#cTemp");
  startTemp.innerHTML = Math.round(response.data.main.temp);
  let startCity = document.querySelector("#cCity");
  startCity.innerHTML = response.data.name;
  let sEmoji = document.querySelector("#cEmoji");
  sEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description = document.querySelector("#cDescription");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
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
