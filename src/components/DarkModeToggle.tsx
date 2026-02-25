import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const DarkModeToggle: React.FC = () => {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className="relative w-12 h-12 rounded-full bg-bg-secondary dark:bg-dark-bg-secondary hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 text-accent-yellow transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm9-9a1 1 0 110 2h-2a1 1 0 110-2h2zM5 12a1 1 0 110 2H3a1 1 0 110-2h2zm14.07-6.36a1 1 0 010 1.41l-1.41 1.42a1 1 0 11-1.42-1.42l1.42-1.41a1 1 0 011.41 0zM7.76 17.66a1 1 0 010 1.41l-1.41 1.42a1 1 0 11-1.42-1.42l1.42-1.41a1 1 0 011.41 0zm11.31 0a1 1 0 011.42 1.41l-1.42 1.42a1 1 0 11-1.41-1.42l1.41-1.41zM7.76 6.34a1 1 0 011.42 1.42L7.76 9.17a1 1 0 11-1.41-1.41l1.41-1.42z" />
        </svg>
        
        {/* Moon icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 text-dark-accent-blue transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div>
    </button>
  );
};
