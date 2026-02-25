import React from 'react';
import { CurrentWeather as CurrentWeatherType } from '../types/weather';
import { useTheme } from '../context/ThemeContext';
import { formatWindSpeed, formatVisibility, formatPressure, formatHumidity } from '../utils/formatters';
import { getWindDirection } from '../utils/weatherIcons';

interface WeatherDetailsProps {
  weather: CurrentWeatherType;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const { unit } = useTheme();

  const details = [
    {
      icon: '💧',
      label: 'Humidity',
      value: formatHumidity(weather.humidity),
    },
    {
      icon: '💨',
      label: 'Wind',
      value: formatWindSpeed(weather.windSpeed, unit),
      subValue: getWindDirection(weather.windDirection),
    },
    {
      icon: '🌡️',
      label: 'Pressure',
      value: formatPressure(weather.pressure),
    },
    {
      icon: '👁️',
      label: 'Visibility',
      value: formatVisibility(weather.visibility),
    },
    {
      icon: '☁️',
      label: 'Cloudiness',
      value: formatHumidity(weather.cloudiness),
    },
    {
      icon: '🌅',
      label: 'Sunrise',
      value: new Date(weather.sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
    },
    {
      icon: '🌇',
      label: 'Sunset',
      value: new Date(weather.sunset * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-card-bg rounded-2xl shadow-card dark:shadow-card-dark p-6 animate-fade-in">
      <h2 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
        Weather Details
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 bg-bg-secondary dark:bg-dark-bg-secondary rounded-xl"
          >
            <span className="text-2xl">{detail.icon}</span>
            <div>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                {detail.label}
              </p>
              <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                {detail.value}
                {detail.subValue && (
                  <span className="text-text-secondary dark:text-dark-text-secondary ml-1">
                    {detail.subValue}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
