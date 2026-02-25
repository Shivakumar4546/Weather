import axios from 'axios';
import { WeatherData, CurrentWeather, HourlyWeather, DailyWeather, Location, WeatherError } from '../types/weather';
import { interpolateHourlyForecast } from '../utils/interpolate';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.error('OpenWeatherMap API key not found. Please set VITE_WEATHER_API_KEY in your .env file.');
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

interface OpenWeatherCurrent {
  coord: { lat: number; lon: number };
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number; deg: number };
  visibility: number;
  clouds: { all: number };
  weather: Array<{ description: string; icon: string; main: string }>;
  dt: number;
}

export interface OpenWeatherForecast {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{ description: string; icon: string; main: string }>;
    pop: number;
  }>;
}

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      api.get<OpenWeatherCurrent>('/weather', { params: { q: city } }),
      api.get<OpenWeatherForecast>('/forecast', { params: { q: city, cnt: 40 } }),
    ]);

    return transformWeatherData(currentRes.data, forecastRes.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw { message: 'City not found. Please check the spelling and try again.', code: '404' } as WeatherError;
      }
      if (error.response?.status === 401) {
        throw { message: 'Invalid API key. Please check your configuration.', code: '401' } as WeatherError;
      }
      if (error.code === 'ECONNABORTED') {
        throw { message: 'Request timeout. Please try again.', code: 'TIMEOUT' } as WeatherError;
      }
    }
    throw { message: 'Failed to fetch weather data. Please try again.', code: 'UNKNOWN' } as WeatherError;
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      api.get<OpenWeatherCurrent>('/weather', { params: { lat, lon } }),
      api.get<OpenWeatherForecast>('/forecast', { params: { lat, lon, cnt: 40 } }),
    ]);

    return transformWeatherData(currentRes.data, forecastRes.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw { message: 'Location not found.', code: '404' } as WeatherError;
      }
    }
    throw { message: 'Failed to fetch weather data. Please try again.', code: 'UNKNOWN' } as WeatherError;
  }
};

const transformWeatherData = (
  current: OpenWeatherCurrent,
  forecast: OpenWeatherForecast
): WeatherData => {

  const location: Location = {
    name: current.name,
    country: current.sys.country,
    lat: current.coord.lat,
    lon: current.coord.lon,
  };

  const currentWeather: CurrentWeather = {
    temperature: current.main.temp,
    feelsLike: current.main.feels_like,
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    windSpeed: current.wind.speed,
    windDirection: current.wind.deg,
    visibility: current.visibility,
    cloudiness: current.clouds.all,
    description: current.weather[0]?.description || '',
    icon: current.weather[0]?.icon || '01d',
    condition: current.weather[0]?.main || 'Clear',
    sunrise: current.sys.sunrise,
    sunset: current.sys.sunset,
    dt: current.dt,
  };

  // Hourly (same as before)
  const hourlyData: HourlyWeather[] = interpolateHourlyForecast(
    forecast.list,
    12
  );

  // ✅ FIXED DAILY GROUPING
  const dailyMap = new Map<string, DailyWeather>();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, {
        dt: item.dt,
        tempMax: item.main.temp,
        tempMin: item.main.temp,
        icon: item.weather[0]?.icon || "01d",
        condition: item.weather[0]?.main || "Clear",
        precipitation: (item.pop ?? 0) * 100,
        humidity: item.main.humidity,
      });
    } else {
      const existing = dailyMap.get(dayKey)!;
      existing.tempMax = Math.max(existing.tempMax, item.main.temp);
      existing.tempMin = Math.min(existing.tempMin, item.main.temp);
    }
  });

  const daily: DailyWeather[] = Array.from(dailyMap.values()).slice(0, 7);

  return {
    current: currentWeather,
    hourly: hourlyData,
    daily,
    location,
  };
};