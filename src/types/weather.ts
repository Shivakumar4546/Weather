export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  location: Location;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  cloudiness: number;
  description: string;
  icon: string;
  condition: string;
  sunrise: number;
  sunset: number;
  dt: number;
}

export interface HourlyWeather {
  dt: number;
  temperature: number;
  icon: string;
  condition: string;
  precipitation: number;
  humidity: number;
}

export interface DailyWeather {
  dt: number;
  tempMax: number;
  tempMin: number;
  icon: string;
  condition: string;
  precipitation: number;
  humidity: number;
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface GeoPosition {
  latitude: number;
  longitude: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherError {
  message: string;
  code?: string;
}

export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
