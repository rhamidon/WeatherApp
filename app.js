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
			console.log(weatherData);
		} else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
			console.log('error');
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
		this._temperature = (value * 1.8 + 32).toFixed(2);
	}
});