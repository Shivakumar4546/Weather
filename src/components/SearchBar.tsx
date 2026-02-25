import React, { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from '../utils/formatters';
import { searchLocations, GeoLocation } from '../services/geocoding';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSelect: (lat: number, lon: number, cityName: string) => void;
  recentSearches: string[];
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationSelect,
  recentSearches,
  loading = false 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useRef(
    debounce(async (value: string) => {
      if (value.trim().length >= 2) {
        setSuggestionsLoading(true);
        try {
          const results = await searchLocations(value);
          setSuggestions(results);
          setShowDropdown(results.length > 0);
        } catch (error) {
          console.error('Error searching locations:', error);
          setSuggestions([]);
          setShowDropdown(false);
        } finally {
          setSuggestionsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 500)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      debouncedSearch(value);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (location: GeoLocation) => {
    const displayName = location.state 
      ? `${location.name}, ${location.state}, ${location.country}`
      : `${location.name}, ${location.country}`;
    
    onLocationSelect(location.lat, location.lon, displayName);
    setQuery(displayName);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleRecentSearch = (city: string) => {
    setQuery(city);
    onSearch(city);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatLocationName = (location: GeoLocation): string => {
    if (location.state) {
      return `${location.name}, ${location.state}, ${location.country}`;
    }
    return `${location.name}, ${location.country}`;
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {loading || suggestionsLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-accent-blue dark:border-t-dark-accent-blue rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-12 py-3.5 text-base bg-bg-secondary dark:bg-dark-bg-secondary border border-transparent dark:border-dark-border-color rounded-pill focus:outline-none focus:border-accent-blue dark:focus:border-dark-accent-blue focus:ring-2 focus:ring-accent-blue/20 dark:focus:ring-dark-accent-blue/20 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card-bg rounded-xl shadow-lg border border-gray-100 dark:border-dark-border-color overflow-hidden z-50 animate-slide-up"
        >
          {suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((location, index) => (
                <li key={`${location.lat}-${location.lon}-${index}`}>
                  <button
                    onClick={() => handleSuggestionClick(location)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-text-primary dark:text-dark-text-primary">
                      {formatLocationName(location)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 && !suggestionsLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No locations found
            </div>
          ) : null}

          {!suggestionsLoading && recentSearches.length > 0 && query.length < 2 && (
            <div className="border-t border-gray-100 dark:border-dark-border-color">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 px-4 py-2 uppercase tracking-wider">
                Recent Searches
              </p>
              {recentSearches.map((city, index) => (
                <button
                  key={`${city}-${index}`}
                  onClick={() => handleRecentSearch(city)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-text-primary dark:text-dark-text-primary">{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
