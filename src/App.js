import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "724c045c9ae80661b805fc3e9736a26e";

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h1 className="title">Weather Forecast</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>
        {loading && <p className="info">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-card">
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].main}</p>
            <p className="description">{weatherData.weather[0].description}</p>
            <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
            <p>💧 Humidity: {weatherData.main.humidity}%</p>
            <p>💨 Wind: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
