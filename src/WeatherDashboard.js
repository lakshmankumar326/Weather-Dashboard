import React, { useState } from 'react';
import axios from 'axios';

function WeatherDashboard() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b34110c6bcda302cf74f02751378bf1`);
            const data = response.data;

            const temperatureInCelsius = data.main.temp - 273.15;

            const windSpeedInKmh = data.wind.speed * 3.6;

            setWeatherData({ ...data, main: { ...data.main, temp: temperatureInCelsius }, wind: { ...data.wind, speed: windSpeedInKmh } });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="weather">
            <h1>Weather Dashboard</h1>
            <input className="inputbox"
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button className="searchbox"
                onClick={handleSearch}>Search</button>
            {weatherData && (
                <div className="weatherpage">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp.toFixed(2)}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed.toFixed(2)} km/h</p>
                </div>
            )}
        </div>
    );
}

export default WeatherDashboard;
