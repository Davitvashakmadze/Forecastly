import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./wheather.scss";
import { Button, Input } from "reactstrap";

function Weather() {
  // state variables
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // function to fetch weather data
  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4ae3de0bdc58aaca724764be343a043&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
      setError("NO DATA");
    }
    setIsLoading(false);
  };



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
      <section className="wheather-section">
        <div className="wheather-wrapper">
          <h1>ამინდის პროგნოზი</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="შეიყვანეთ ქალაქი"
              value={city}
              onChange={handleChange}
            />
            <Button type="submit">ძიება</Button>
          </form>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
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
      </section>
    </div>
  );
}

export default Weather;
