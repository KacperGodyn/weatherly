import React, { useState, useEffect } from 'react';

interface WeatherApiProps {
  apiKey: string;
  locationName: string | null; // Location name prop
}

const WeatherApi: React.FC<WeatherApiProps> = ({ apiKey, locationName }) => {
  const [weatherData, setWeatherData] = useState<any>(null); // State variable to store weather data

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=eaa395e8574f4aa2afa210558242204&q=${locationName}&aqi=no`);
        const data = await response.json();
        setWeatherData(data); // Set weather data in state
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData(); // Call the fetchWeatherData function when the component mounts
  }, [apiKey, locationName]); // Fetch weather data whenever apiKey or locationName changes

  return (
    <div>
      <h2>Weather Information</h2>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.current.temp_c} &deg;C</p>
          <p>Humidity: {weatherData.current.condition.text}</p>
          <p>Wind Speed: {weatherData.current.pressure_mb}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApi;
