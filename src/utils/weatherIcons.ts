export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  };

  return iconMap[iconCode] || '🌡️';
};

export const getWeatherGradient = (condition: string): string[] => {
  const gradients: Record<string, string[]> = {
    'Clear': ['#4FC3F7', '#0288D1'],
    'Clouds': ['#90A4AE', '#546E7A'],
    'Rain': ['#4DD0E1', '#0097A7'],
    'Drizzle': ['#80DEEA', '#00ACC1'],
    'Thunderstorm': ['#7E57C2', '#512DA8'],
    'Snow': ['#E1F5FE', '#B3E5FC'],
    'Mist': ['#CFD8DC', '#90A4AE'],
    'Fog': ['#CFD8DC', '#90A4AE'],
    'Haze': ['#FFE0B2', '#FFB74D'],
    'default': ['#4FC3F7', '#0288D1'],
  };

  return gradients[condition] || gradients['default'];
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
