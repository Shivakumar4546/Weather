import React from "react";

interface DailyForecastProps {
  forecast?: any[]; // make optional to prevent crash
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {

  const getDayName = (timestamp: number) => {
    if (!timestamp) return "";
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  // If forecast is missing or empty, don't render anything
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">7-Day Forecast</h2>

      <div className="space-y-4">
        {forecast.slice(0, 7).map((day: any) => {

          const weather = day?.weather?.[0];
          const maxTemp = day?.temp?.max;
          const minTemp = day?.temp?.min;

          return (
            <div
              key={day?.dt}
              className="flex items-center justify-between"
            >
              <p className="w-16 font-medium">
                {getDayName(day?.dt)}
              </p>

              {weather && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt={weather.description}
                  className="w-8 h-8"
                />
              )}

              {day?.pop !== undefined && (
                <p className="text-blue-500 text-sm w-12">
                  {Math.round(day.pop * 100)}%
                </p>
              )}

              <div className="flex items-center gap-2 w-24 justify-end">
                <span className="font-semibold">
                  {Math.round(maxTemp ?? 0)}°
                </span>
                <span className="text-gray-400">
                  {Math.round(minTemp ?? 0)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;