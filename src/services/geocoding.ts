import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/geo/1.0';

if (!API_KEY) {
  console.error('OpenWeatherMap API key not found. Please set VITE_WEATHER_API_KEY in your .env file.');
}

const geoApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  },
});

export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
}

export interface GeoError {
  message: string;
  code?: string;
}

export const searchLocations = async (query: string): Promise<GeoLocation[]> => {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const response = await geoApi.get<GeoLocation[]>('/direct', {
      params: {
        q: query.trim(),
        limit: 5,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return [];
      }
      if (error.response?.status === 401) {
        throw { message: 'Invalid API key. Please check your configuration.', code: '401' } as GeoError;
      }
    }
    throw { message: 'Failed to search locations. Please try again.', code: 'UNKNOWN' } as GeoError;
  }
};
