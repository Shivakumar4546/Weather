import React from 'react';
import { CurrentWeather as CurrentWeatherType, Location } from '../types/weather';
import { useTheme } from '../context/ThemeContext';
import { formatTemperature, formatTimestamp } from '../utils/formatters';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherIcons';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: Location;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, location }) => {
  const { unit } = useTheme();
  const gradient = getWeatherGradient(weather.condition);
  const icon = getWeatherIcon(weather.icon);

  return (
    <div 
      className="relative overflow-hidden rounded-2xl p-8 animate-fade-in"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
      }}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center text-white">
          {/* Location */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-medium tracking-wide">
              {location.name}, {location.country}
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Updated {formatTimestamp(weather.dt)}
            </p>
          </div>

          {/* Main temperature */}
          <div className="flex items-center justify-center gap-6 my-6">
            <span className="text-8xl font-light tracking-tight">
              {formatTemperature(weather.temperature, unit)}
            </span>
            <span className="text-6xl">{icon}</span>
          </div>

          {/* Description */}
          <p className="text-xl font-medium text-white/90 capitalize mb-2">
            {weather.description}
          </p>

          {/* Feels like */}
          <p className="text-white/80">
            Feels like {formatTemperature(weather.feelsLike, unit)}
          </p>
        </div>
      </div>
    </div>
  );
};
