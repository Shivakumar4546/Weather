import React from "react";

interface DailyForecastItem {
  dt: number;
  tempMax: number;
  tempMin: number;
  icon: string;
  condition: string;
  precipitation: number;
  humidity: number;
}

interface DailyForecastProps {
  forecast: DailyForecastItem[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {

  const getDayName = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">7-Day Forecast</h2>

      <div className="space-y-4">
        {forecast.slice(0, 7).map((day) => (
          <div key={day.dt} className="flex items-center justify-between">

            <p className="w-16 font-medium">
              {getDayName(day.dt)}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.condition}
              className="w-8 h-8"
            />

            <p className="text-blue-500 text-sm w-12">
              {Math.round(day.precipitation)}%
            </p>

            <div className="flex items-center gap-2 w-24 justify-end">
              <span className="font-semibold">
                {Math.round(day.tempMax)}°
              </span>
              <span className="text-gray-400">
                {Math.round(day.tempMin)}°
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;