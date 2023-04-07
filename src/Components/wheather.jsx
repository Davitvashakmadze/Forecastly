import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  // state variables
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // function to fetch weather data
  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        // `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={f4ae3de0bdc58aaca724764be343a043}`
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4ae3de0bdc58aaca724764be343a043&units=metric`
      );
      setWeatherData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  // function to handle input change
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  // render function
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChange} />
        <button type="submit">Get Weather</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>No weather data</p>
      )}
    </div>
  );
}

export default Weather;