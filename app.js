const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res) {
  const cityName = req.body.cityName;
  const appid = 'ca7e9ec969ad1cce407a30f2829b0e9f';
  const units = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appid}&units=${units}`;
  https.get(url, function (response) {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const image = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      res.write(`<h1>The temperature in ${cityName} is: ${temp} &#8451</h1>`);
      res.write(`<h3>The weather is currently ${weatherDescription}</h3>`);
      res.write(
        ` <img src="${image}" alt="${weatherData.name}' weather icon">`
      );

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log('The server is running on port 3000');
});
