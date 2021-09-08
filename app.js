// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");
//
// const app = express();
//
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//
// app.use(express.static(__dirname + '/public'));
//
//
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
//
// app.post("/", function(req, res) {
// const apkey = "059bf42730e9e5b18b0c68592453373a"
// const query = req.body.cityname;
// const unit = "metric"
// const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apkey + "&units=" + unit;
//
// https.get(url, function(response) {
//   console.log(response.statusCode);
//
//   response.on("data", function(data) {
//     const weatherData = JSON.parse(data)
//     const temp = weatherData.main.temp
//     const weatherDescription = weatherData.weather[0].description
//     const conditionIcon = weatherData.weather[0].icon
//     const weatherConditionIconImgURL = "http://openweathermap.org/img/wn/" + conditionIcon + "@2x.png"
//
//
//
//     res.write();
//     res.write("<h2>Weather current is " + weatherDescription + "</h2>");
//     // res.write("<img src=" + weatherConditionIconImgURL + ">");
//     res.send();
//   })
// })
//
//
// })

const api = '059bf42730e9e5b18b0c68592453373a'; //Replace with your API

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, feels_like } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});


app.listen(process.env.PORT || 3000, function() {
});
