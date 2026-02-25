import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HourlyWeather } from '../types/weather';
import { useTheme } from '../context/ThemeContext';
import { formatTime } from '../utils/formatters';

interface TemperatureChartProps {
  hourly: HourlyWeather[];
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ hourly }) => {
  const { unit, isDark } = useTheme();

  const data = hourly.map(item => ({
    time: formatTime(item.dt),
    temp: unit === 'fahrenheit' ? (item.temperature * 9/5) + 32 : item.temperature,
    original: item.temperature,
  }));

  const textColor = isDark ? '#9AA0A6' : '#5F6368';
  const gradientColor = isDark ? '#8AB4F8' : '#4285F4';

  return (
    <div className="bg-white dark:bg-dark-card-bg rounded-2xl shadow-card dark:shadow-card-dark p-6 animate-fade-in">
      <h2 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-4">
        Temperature Trend
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={gradientColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: textColor }}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#5F6368' : '#DADCE0' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: textColor }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${Math.round(value)}°`}
              width={40}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#303134' : '#FFFFFF',
                border: `1px solid ${isDark ? '#5F6368' : '#DADCE0'}`,
                borderRadius: '8px',
                color: isDark ? '#E8EAED' : '#202124',
              }}
              labelStyle={{ color: isDark ? '#E8EAED' : '#202124' }}
              formatter={(value: number) => [`${Math.round(value as number)}°`, 'Temperature']}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke={gradientColor}
              strokeWidth={2}
              fill="url(#tempGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
