import React from 'react';
import { SearchBar } from './SearchBar';
import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  onSearch: (city: string) => void;
  onLocationSelect: (lat: number, lon: number, cityName: string) => void;
  recentSearches: string[];
  onUseLocation: () => void;
  locationLoading: boolean;
  locationError: string | null;
  onClearLocationError: () => void;
  loading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onLocationSelect,
  recentSearches,
  onUseLocation,
  locationLoading,
  locationError,
  onClearLocationError,
  loading = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg-primary/80 backdrop-blur-glass border-b border-gray-100 dark:border-dark-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-yellow to-accent-red rounded-full flex items-center justify-center">
              <span className="text-2xl">☀️</span>
            </div>
            <span className="text-xl font-medium text-text-primary dark:text-dark-text-primary hidden sm:block">
              WeatherNow
            </span>
          </div>

{/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <SearchBar
              onSearch={onSearch}
              onLocationSelect={onLocationSelect}
              recentSearches={recentSearches}
              loading={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Geolocation Button */}
            <button
              onClick={onUseLocation}
              disabled={locationLoading}
              className="w-12 h-12 rounded-full bg-bg-secondary dark:bg-dark-bg-secondary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center disabled:opacity-50"
              aria-label="Use my location"
            >
              {locationLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-accent-blue dark:border-t-dark-accent-blue rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 text-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </div>

        {/* Location Error */}
        {locationError && (
          <div className="pb-3 animate-fade-in">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center justify-between">
              <p className="text-sm text-red-800 dark:text-red-200">{locationError}</p>
              <button
                onClick={onClearLocationError}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
