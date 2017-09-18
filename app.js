"use strict";
var buttonSearch = document.querySelector("button");
var textCity = document.getElementById('city');

buttonSearch.addEventListener('click', searchWeather);
function searchWeather() {
	var cityName = textCity.value.trim();
	if(cityName.length > 1)
		getWeatherData(cityName);
	else
		return alert('Please enter a city!');
}

function getWeatherData(city){
	var apiKey = 'f58c743ce4b7e6169891b466efd5918c';
	var http = new XMLHttpRequest(); 
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
	http.open('GET', url, true);
	http.onreadystatechange = function () {
		if(http.readyState === XMLHttpRequest.DONE && http.status === 200)	{
			var data = JSON.parse(http.responseText);
			var weatherData = new Weather(data.name, data.weather[0].description.toUpperCase());
			weatherData.temperature = data.main.temp;
			displayData(weatherData);
		} else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
			alert('Error occured!');
		}
	};
	http.send();
}

function Weather(city, description) {
	this.cityName = city;
	this.description = description;
	this._temperature = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
	get: function () {
		return this._temperature;
	},
	set: function (value) {
		this._temperature = (9/5 * (value - 273) + 32).toFixed(2);

	}
});

function displayData(weather) {
	var weatherBlock = document.getElementById('weather');
	var cityName = document.getElementById('weatherCity');
	var description = document.getElementById('weatherDescription');
	var temperature = document.getElementById('weatherTemperature');

	cityName.textContent = weather.cityName;
	description.textContent = weather.description;
	temperature.textContent = weather.temperature + 'F.';
	weatherBlock.style.display = 'block';

}