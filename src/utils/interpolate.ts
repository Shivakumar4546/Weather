import { HourlyWeather } from '../types/weather';

interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  pop: number;
}

/**
 * Linear interpolation between two values
 */
const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

/**
 * Interpolate a value at a specific time between two forecast points
 */
const interpolateValue = (
  time1: number,
  value1: number,
  time2: number,
  value2: number,
  targetTime: number
): number => {
  const timeDiff = time2 - time1;
  if (timeDiff === 0) return value1;
  const factor = (targetTime - time1) / timeDiff;
  return lerp(value1, value2, factor);
};

/**
 * Convert 3-hour interval forecast to 1-hour continuous forecast
 * @param forecastList - Array of 3-hour forecast data from OpenWeatherMap
 * @param hoursNeeded - Number of hours to generate (default: 12)
 * @returns Array of hourly forecast data
 */
export const interpolateHourlyForecast = (
  forecastList: OpenWeatherForecastItem[],
  hoursNeeded: number = 12
): HourlyWeather[] => {
  if (!forecastList || forecastList.length === 0) {
    return [];
  }

  const result: HourlyWeather[] = [];
  const now = Math.floor(Date.now() / 1000);
  
  // Find the first forecast point that's in the future
  let startIndex = 0;
  for (let i = 0; i < forecastList.length; i++) {
    if (forecastList[i].dt > now) {
      startIndex = Math.max(0, i - 1); // Include the previous point for interpolation
      break;
    }
  }

  // Generate hourly forecast
  const startTime = startIndex < forecastList.length ? forecastList[startIndex].dt : now;
  
  for (let i = 0; i < hoursNeeded; i++) {
    const targetTime = startTime + i * 3600; // Add 1 hour (3600 seconds)
    
    // Find the two forecast points to interpolate between
    let lowerIndex = startIndex;
    let upperIndex = startIndex + 1;
    
    for (let j = startIndex; j < forecastList.length - 1; j++) {
      if (forecastList[j].dt <= targetTime && forecastList[j + 1].dt > targetTime) {
        lowerIndex = j;
        upperIndex = j + 1;
        break;
      }
    }
    
    // Ensure we have valid indices
    if (lowerIndex >= forecastList.length) {
      lowerIndex = forecastList.length - 1;
    }
    if (upperIndex >= forecastList.length) {
      upperIndex = forecastList.length - 1;
    }
    
    const lower = forecastList[lowerIndex];
    const upper = forecastList[upperIndex];
    
    // Interpolate temperature
    const temperature = interpolateValue(
      lower.dt,
      lower.main.temp,
      upper.dt,
      upper.main.temp,
      targetTime
    );
    
    // Interpolate humidity
    const humidity = interpolateValue(
      lower.dt,
      lower.main.humidity,
      upper.dt,
      upper.main.humidity,
      targetTime
    );
    
    // Interpolate precipitation probability
    const precipitation = interpolateValue(
      lower.dt,
      lower.pop * 100,
      upper.dt,
      upper.pop * 100,
      targetTime
    );
    
    // Use the weather icon from the closest forecast point
    const iconTimeDiff = Math.abs(targetTime - lower.dt);
    const icon = iconTimeDiff < Math.abs(targetTime - upper.dt)
      ? lower.weather[0]?.icon || '01d'
      : upper.weather[0]?.icon || '01d';
    
    const condition = iconTimeDiff < Math.abs(targetTime - upper.dt)
      ? lower.weather[0]?.main || 'Clear'
      : upper.weather[0]?.main || 'Clear';
    
    result.push({
      dt: targetTime,
      temperature,
      icon,
      condition,
      precipitation,
      humidity,
    });
  }
  
  return result;
};
