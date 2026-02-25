import React from 'react';
import { DailyWeather } from '../types/weather';
import { useTheme } from '../context/ThemeContext';
import { formatTemperature, formatDay } from '../utils/formatters';
import { getWeatherIcon } from '../utils/weatherIcons';

interface DailyForecastProps {
  daily: DailyWeather[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  const { unit } = useTheme();
  const today = Math.floor(Date.now() / 1000);

  return (
    <div className="bg-white dark:bg-dark-card-bg rounded-2xl shadow-card dark:shadow-card-dark p-6 animate-fade-in">
      <h2 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
        7-Day Forecast
      </h2>
      <div className="space-y-2">
        {daily.map((day) => {
          const isToday = day.dt >= today && day.dt < today + 86400;
          
          return (
            <div
              key={day.dt}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                isToday
                  ? 'bg-accent-blue/10 dark:bg-dark-accent-blue/20 border border-accent-blue/30 dark:border-dark-accent-blue/30'
                  : 'hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
              }`}
            >
              <div className="w-20">
                <span className={`text-sm font-medium ${
                  isToday
                    ? 'text-accent-blue dark:text-dark-accent-blue'
                    : 'text-text-primary dark:text-dark-text-primary'
                }`}>
                  {formatDay(day.dt)}
                </span>
              </div>

              <div className="w-10 text-2xl">
                {getWeatherIcon(day.icon)}
              </div>

              <div className="w-12 text-right">
                {day.precipitation > 0 && (
                  <span className="text-xs text-accent-blue dark:text-dark-accent-blue">
                    {Math.round(day.precipitation)}%
                  </span>
                )}
              </div>

              <div className="flex-1 flex items-center justify-end gap-2">
                <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                  {formatTemperature(day.tempMax, unit)}
                </span>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-red rounded-full"
                    style={{
                      width: `${Math.min(100, ((day.tempMax - day.tempMin) / 30) * 100)}%`,
                      marginLeft: `${Math.max(0, ((day.tempMin + 20) / 60) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-text-secondary dark:text-dark-text-secondary w-10 text-right">
                  {formatTemperature(day.tempMin, unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
