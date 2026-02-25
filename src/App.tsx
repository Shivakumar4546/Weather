import { useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { TemperatureChart } from './components/TemperatureChart';
import { RecentSearches } from './components/RecentSearches';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalStorage } from './hooks/useLocalStorage';

const DEFAULT_CITY = 'London';

function App() {
  const { data, loading, error, fetchWeather, fetchWeatherByLocation, clearError } = useWeather();
  const { position, error: locationError, loading: locationLoading, getCurrentPosition, clearError: clearLocationError } = useGeolocation();
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('weathernow-recent-searches', []);

  useEffect(() => {
    if (!data && !loading) {
      fetchWeather(DEFAULT_CITY);
    }
  }, []);

  useEffect(() => {
    if (position && !loading) {
      fetchWeatherByLocation(position.latitude, position.longitude);
    }
  }, [position]);

  const handleSearch = useCallback((city: string) => {
    fetchWeather(city);
    setRecentSearches(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 5);
    });
  }, [fetchWeather, setRecentSearches]);

  const handleLocationSelect = useCallback((lat: number, lon: number, cityName: string) => {
    fetchWeatherByLocation(lat, lon);
    setRecentSearches(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== cityName.toLowerCase());
      return [cityName, ...filtered].slice(0, 5);
    });
  }, [fetchWeatherByLocation, setRecentSearches]);

  const handleUseLocation = useCallback(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  const handleClearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  if (loading && !data) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-bg-secondary dark:bg-dark-bg-secondary transition-colors">
      <Header
        onSearch={handleSearch}
        onLocationSelect={handleLocationSelect}
        recentSearches={recentSearches}
        onUseLocation={handleUseLocation}
        locationLoading={locationLoading}
        locationError={locationError}
        onClearLocationError={clearLocationError}
        loading={loading}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6">
            <ErrorMessage
              message={error.message}
              onRetry={() => data ? fetchWeather(data.location.name) : fetchWeather(DEFAULT_CITY)}
              onDismiss={clearError}
            />
          </div>
        )}

        {data && (
          <div className="space-y-6">
            <CurrentWeather weather={data.current} location={data.location} />

            {loading && <LoadingSpinner />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <HourlyForecast hourly={data.hourly} />
                <TemperatureChart hourly={data.hourly} />
              </div>

              <div className="space-y-6">
                <DailyForecast daily={data.daily} />
                <WeatherDetails weather={data.current} />
              </div>
            </div>

            {recentSearches.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border-color">
                <RecentSearches
                  searches={recentSearches}
                  onSearch={handleSearch}
                  onClear={handleClearRecentSearches}
                />
              </div>
            )}

            <footer className="mt-8 py-6 text-center text-sm text-text-secondary dark:text-dark-text-secondary">
              <p>Weather data provided by OpenWeatherMap</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
