import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'a6b25fe79a2f449a941180722251808';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: API_KEY,
          q: city
        }
      });
      setWeather(response.data.current);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading data…</p>}

      {weather && !loading && (
        <div className="weather-cards">
          <div className="weather-card">Temperature <br /> {weather.temp_c}°C</div>
          <div className="weather-card">Humidity <br /> {weather.humidity}%</div>
          <div className="weather-card">Condition <br /> {weather.condition.text}</div>
          <div className="weather-card">Wind Speed <br /> {weather.wind_kph} kph</div>
        </div>
      )}
    </div>
  );
}

export default App;