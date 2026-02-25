import React from 'react';

interface RecentSearchesProps {
  searches: string[];
  onSearch: (city: string) => void;
  onClear: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({ 
  searches, 
  onSearch, 
  onClear 
}) => {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-4">
      <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
        Recent:
      </span>
      {searches.map((city, index) => (
        <button
          key={`${city}-${index}`}
          onClick={() => onSearch(city)}
          className="px-3 py-1.5 text-sm bg-bg-secondary dark:bg-dark-bg-secondary hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-text-primary dark:text-dark-text-primary"
        >
          {city}
        </button>
      ))}
      <button
        onClick={onClear}
        className="px-3 py-1.5 text-sm text-text-secondary dark:text-dark-text-secondary hover:text-accent-red dark:hover:text-dark-accent-red transition-colors"
      >
        Clear
      </button>
    </div>
  );
};
