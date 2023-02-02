// Change date to today:

let now = new Date();

let today = document.querySelector(".date");
let time = document.querySelector(".time");

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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date = now.getDate();
let year = now.getFullYear();
let month = months[now.getMonth()];
let hour = now.getHours();
let minutes = now.getMinutes();

today.innerHTML = ` ${date} ${month}, ${year}`;
time.innerHTML = ` last updated: ${hour}:${minutes}`;

// When a user searches for a city:
//display the name and the current temperature of the city.

function changeCity(event) {
  event.preventDefault();

  let city = document.querySelector(".city-input");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${city.value},`;

  let unit = `metric`;
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${unit}&appid=${apiKey}`;

  function displayWeather(response) {
    let temp = Math.round(response.data.main.temp);

    let currentTemp = document.querySelector(".temp");
    currentTemp.innerHTML = `${temp}°C`;

    let country = response.data.sys.country;
    let currentCountry = document.querySelector("#country");
    currentCountry.innerHTML = country;
  }

  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

// Add a Current Location button.

function changeCurrentLocation() {
  function getCurrentLocation(location) {
    function showTemperature(position) {
      let city = position.data.name;
      let currentCity = document.querySelector("#city");
      currentCity.innerHTML = city;

      let temp = Math.round(position.data.main.temp);
      let currentTemp = document.querySelector(".temp");
      currentTemp.innerHTML = `${temp}°C`;

      let country = position.data.sys.country;
      let currentCountry = document.querySelector("#country");
      currentCountry.innerHTML = country;
    }

    let unit = `metric`;
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let apiKey = `b9ba0314a93083136d968577c718e31d`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", changeCurrentLocation);
