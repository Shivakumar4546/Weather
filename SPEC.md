# Google-Style Weather Web Application Specification

## 1. Project Overview

**Project Name:** WeatherNow  
**Project Type:** Single Page Web Application  
**Core Functionality:** A Google-inspired weather dashboard that displays current weather, hourly forecast, 7-day forecast, and temperature charts with a clean, minimalist design.  
**Target Users:** General users looking for weather information with a premium, Google-like experience.

---

## 2. UI/UX Specification

### Layout Structure

**Page Sections:**
- **Header (64px):** Logo/brand, search bar, dark mode toggle, geolocation button
- **Hero Section (400px):** Current weather display with large temperature
- **Content Grid:** 
  - Left column (60%): Hourly forecast, temperature chart
  - Right column (40%): 7-day forecast, weather details
- **Footer (48px):** Recent searches, attribution

**Responsive Breakpoints:**
- Mobile: < 640px (single column, stacked layout)
- Tablet: 640px - 1024px (two columns)
- Desktop: > 1024px (full grid layout)

### Visual Design

**Color Palette (Light Mode):**
- Background Primary: `#FFFFFF`
- Background Secondary: `#F8F9FA`
- Text Primary: `#202124`
- Text Secondary: `#5F6368`
- Accent Blue: `#4285F4`
- Accent Green: `#34A853`
- Accent Yellow: `#FBBC04`
- Accent Red: `#EA4335`
- Border: `#DADCE0`
- Card Background: `#FFFFFF`
- Shadow: `rgba(60,64,67,0.15)`

**Color Palette (Dark Mode):**
- Background Primary: `#202124`
- Background Secondary: `#303134`
- Text Primary: `#E8EAED`
- Text Secondary: `#9AA0A6`
- Accent Blue: `#8AB4F8`
- Accent Green: `#81C995`
- Accent Yellow: `#FDD663`
- Accent Red: `#F28B82`
- Border: `#5F6368`
- Card Background: `#303134`
- Shadow: `rgba(0,0,0,0.3)`

**Typography:**
- Font Family: `"Google Sans", "Product Sans", Arial, sans-serif`
- Temperature Display: 96px, font-weight 300
- Section Headers: 20px, font-weight 500
- Body Text: 14px, font-weight 400
- Small Text: 12px, font-weight 400

**Spacing System:**
- Base unit: 8px
- Content padding: 24px (desktop), 16px (mobile)
- Card padding: 20px
- Element gaps: 16px, 24px

**Visual Effects:**
- Card shadow: `0 1px 3px rgba(60,64,67,0.3), 0 4px 8px rgba(60,64,67,0.15)`
- Hover transitions: 200ms ease-in-out
- Border radius: 8px (cards), 24px (search input), 50% (buttons)
- Frosted glass effect on header: `backdrop-filter: blur(10px)`

### Components

**1. Search Bar**
- Rounded pill shape with magnifying glass icon
- Placeholder: "Search for a city..."
- Autocomplete dropdown with recent searches
- States: default, focused (blue border), loading
- Clear button when text present

**2. Current Weather Card**
- Large temperature (96px) with degree symbol
- Weather condition icon (animated)
- "Feels like" temperature
- City name and last updated time
- Background gradient based on weather condition

**3. Weather Details Grid**
- Humidity with icon and percentage
- Wind speed with direction arrow
- UV Index (if available)
- Pressure
- Visibility
- Sunrise/Sunset times

**4. Hourly Forecast**
- Horizontal scrollable container
- 12 hours displayed
- Each hour: time, icon, temperature
- Current hour highlighted

**5. 7-Day Forecast**
- Vertical list with days
- Each day: day name, icon, high/low temps, precipitation chance
- Today highlighted differently

**6. Temperature Chart**
- Area chart using Recharts
- Shows 24-hour temperature trend
- Gradient fill matching theme
- Tooltip on hover

**7. Dark Mode Toggle**
- Circular button with sun/moon icons
- Smooth transition between modes
- Persists preference in localStorage

**8. Geolocation Button**
- Location pin icon
- Shows user's current location weather
- Permission request handling

**9. Loading Spinner**
- Google-style animated spinner
- Full-screen overlay during initial load
- Inline spinner for search

**10. Error Display**
- Toast notifications for errors
- Inline error messages
- Retry buttons

**11. Recent Searches**
- List of last 5 cities
- Click to quick-search
- Clear history option

---

## 3. Functionality Specification

### Core Features

**1. City Search**
- Text input with debounced API calls (300ms)
- Fetches weather data from OpenWeatherMap API
- Displays current weather and forecasts
- Saves search to localStorage

**2. Current Weather Display**
- Temperature in Celsius (default) or Fahrenheit
- Weather condition (sunny, cloudy, rainy, etc.)
- Feels like temperature
- Weather description
- Update timestamp

**3. Weather Details**
- Humidity percentage
- Wind speed (m/s or mph)
- Wind direction
- Atmospheric pressure (hPa)
- Visibility (km)
- Cloudiness percentage

**4. Hourly Forecast**
- 12-hour forecast
- Temperature, condition, precipitation chance
- Scrollable horizontal list

**5. 7-Day Forecast**
- Daily high/low temperatures
- Weather conditions
- Precipitation probability

**6. Temperature Chart**
- 24-hour temperature visualization
- Interactive tooltips
- Responsive sizing

**7. Dark Mode**
- Toggle between light/dark themes
- System preference detection on first load
- localStorage persistence

**8. Geolocation**
- Get user's coordinates via browser API
- Fetch weather for current location
- Handle permission denied gracefully

**9. Recent Searches**
- Store last 5 searches in localStorage
- Display in dropdown/footer
- Click to re-search
- Clear option

**10. Error Handling**
- Network error messages
- City not found handling
- API rate limit handling
- Retry mechanisms

### User Interactions

- Click search → fetch and display weather
- Type in search → show suggestions/recent searches
- Click geolocation → get weather for current location
- Toggle dark mode → switch theme
- Click recent search → load that city's weather
- Scroll hourly forecast → view more hours
- Hover chart → see temperature at specific time

### Data Handling

**OpenWeatherMap API Endpoints:**
- Current weather: `/data/2.5/weather?q={city}`
- Forecast: `/data/2.5/forecast?q={city}`
- One Call: `/data/3.0/onecall?lat={lat}&lon={lon}`

**localStorage:**
- Theme preference: `weathernow-theme`
- Recent searches: `weathernow-recent-searches`
- Temperature unit: `weathernow-unit`

### Edge Cases

- Empty search input → show placeholder/default city
- Invalid city name → show "City not found" error
- Network offline → show offline message
- API rate limit → show retry message
- Geolocation denied → show permission message
- No recent searches → show empty state

---

## 4. Technical Specification

### Tech Stack
- React 18+ with Vite
- TypeScript
- Tailwind CSS
- Recharts for charts
- Axios for API calls

### Project Structure
```
weather/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── WeatherDetails.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── DailyForecast.tsx
│   │   ├── TemperatureChart.tsx
│   │   ├── DarkModeToggle.tsx
│   │   ├── RecentSearches.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/
│   │   ├── useWeather.ts
│   │   ├── useLocalStorage.ts
│   │   └── useGeolocation.ts
│   ├── services/
│   │   └── weatherApi.ts
│   ├── types/
│   │   └── weather.ts
│   ├── utils/
│   │   ├── weatherIcons.ts
│   │   └── formatters.ts
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── .env.example
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Header displays logo, search bar, dark mode toggle, geolocation button
- [ ] Current weather shows large temperature with condition icon
- [ ] Weather details show humidity, wind, pressure, etc.
- [ ] Hourly forecast scrolls horizontally showing 12 hours
- [ ] 7-day forecast displays daily high/low temps
- [ ] Temperature chart renders with smooth gradient
- [ ] Dark mode toggles all colors smoothly
- [ ] Recent searches appear and are clickable
- [ ] Loading spinner displays during API calls
- [ ] Error messages appear for invalid searches

### Functional Checkpoints
- [ ] Search by city name returns weather data
- [ ] Geolocation button requests permission and loads local weather
- [ ] Dark mode preference persists across sessions
- [ ] Recent searches persist in localStorage
- [ ] Temperature unit can be toggled (implied from requirements)
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] API key loaded from environment variable

### Performance Checkpoints
- [ ] Initial load under 3 seconds
- [ ] Search results appear within 1 second
- [ ] Smooth animations (60fps)
- [ ] No console errors in production build
