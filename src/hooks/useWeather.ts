import { useState, useCallback } from 'react';
import { WeatherData, WeatherError } from '../types/weather';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../services/weatherApi';

interface UseWeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
}

export function useWeather() {
  const [state, setState] = useState<UseWeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchWeather = useCallback(async (city: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetchWeatherByCity(city);
      setState({ data, loading: false, error: null });
    } catch (err) {
      const error = err as WeatherError;
      setState({ data: null, loading: false, error });
    }
  }, []);

  const fetchWeatherByLocation = useCallback(async (lat: number, lon: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      setState({ data, loading: false, error: null });
    } catch (err) {
      const error = err as WeatherError;
      setState({ data: null, loading: false, error });
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    fetchWeather,
    fetchWeatherByLocation,
    clearError,
  };
}
