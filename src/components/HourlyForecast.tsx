import React from 'react';
import { HourlyWeather } from '../types/weather';
import { useTheme } from '../context/ThemeContext';
import { formatTemperature, formatTime } from '../utils/formatters';
import { getWeatherIcon } from '../utils/weatherIcons';

interface HourlyForecastProps {
  hourly: HourlyWeather[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const { unit } = useTheme();
  const now = Math.floor(Date.now() / 1000);

  return (
    <div className="bg-white dark:bg-dark-card-bg rounded-2xl shadow-card dark:shadow-card-dark p-6 animate-fade-in">
      <h2 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
        Hourly Forecast
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {hourly.map((item, index) => {
          const isCurrent = index === 0 || (item.dt >= now && hourly[index - 1].dt < now);
          const isNow = index === 0;
          
          return (
            <div
              key={item.dt}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                isCurrent 
                  ? 'bg-accent-blue/10 dark:bg-dark-accent-blue/20 border border-accent-blue/30 dark:border-dark-accent-blue/30' 
                  : 'bg-bg-secondary dark:bg-dark-bg-secondary hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className={`text-xs font-medium ${
                isNow 
                  ? 'text-accent-blue dark:text-dark-accent-blue' 
                  : 'text-text-secondary dark:text-dark-text-secondary'
              }`}>
                {isNow ? 'Now' : formatTime(item.dt)}
              </span>
              <span className="text-3xl">{getWeatherIcon(item.icon)}</span>
              <span className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                {formatTemperature(item.temperature, unit)}
              </span>
              {item.precipitation > 0 && (
                <span className="text-xs text-accent-blue dark:text-dark-accent-blue">
                  {Math.round(item.precipitation)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
