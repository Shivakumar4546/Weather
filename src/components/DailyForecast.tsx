import React from "react";

interface DailyForecastProps {
  forecast: any[];   // 👈 allow any type (fixes type mismatch)
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  const getDayName = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">7-Day Forecast</h2>

      <div className="space-y-4">
        {forecast?.slice(0, 7).map((day: any) => (
          <div key={day.dt} className="flex items-center justify-between">
            <p className="w-16 font-medium">
              {getDayName(day.dt)}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="w-8 h-8"
            />

            {day.pop !== undefined && (
              <p className="text-blue-500 text-sm w-12">
                {Math.round(day.pop * 100)}%
              </p>
            )}

            <div className="flex items-center gap-2 w-24 justify-end">
              <span className="font-semibold">
                {Math.round(day.temp.max)}°
              </span>
              <span className="text-gray-400">
                {Math.round(day.temp.min)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DailyForecast;