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

	if(weather.temperature > 95) {
		weatherBlock.style.backgroundColor = '#FE6700';
	} else if (weather.temperature > 85) {
		weatherBlock.style.backgroundColor = '#FED000';
	} else if (weather.temperature > 76) {
		weatherBlock.style.backgroundColor = '#9AD000';
	} else if (weather.temperature > 67) {
		weatherBlock.style.backgroundColor = '#008001';
	} else if (weather.temperature > 58) {
		weatherBlock.style.backgroundColor = '#2DD1CA';
	} else if (weather.temperature > 49) {
		weatherBlock.style.backgroundColor = '#99CDFC';
	} else if (weather.temperature > 40) {
		weatherBlock.style.backgroundColor = '#2E65FD';
	} else if (weather.temperature > 31) {
		weatherBlock.style.backgroundColor = '#0002FB';
	} else {
		weatherBlock.style.backgroundColor = '#000083';
	}  
	weatherBlock.style.display = 'block';

}