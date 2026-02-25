import React, { createContext, useContext, useEffect } from 'react';
import { TemperatureUnit } from '../types/weather';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  unit: TemperatureUnit;
  toggleUnit: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useLocalStorage('weathernow-theme', false);
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>('weathernow-unit', 'celsius');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('weathernow-theme')) {
      setIsDark(prefersDark);
    }
  }, [setIsDark]);

  const toggleDark = () => setIsDark(!isDark);
  const toggleUnit = () => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark, unit, toggleUnit }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
