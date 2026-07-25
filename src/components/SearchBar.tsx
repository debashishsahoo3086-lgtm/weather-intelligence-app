import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-white transition-colors">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city (e.g. London, San Francisco...)"
        disabled={isLoading}
        className={cn(
          "block w-full pl-11 pr-24 py-3 rounded-xl",
          "bg-white/40 dark:bg-white/5 border border-slate-300/50 dark:border-white/20",
          "text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none",
          "focus:border-blue-500/50 dark:focus:border-white/40 focus:bg-white/60 dark:focus:bg-white/10",
          "transition-all duration-200 ease-in-out text-base font-medium shadow-inner dark:shadow-none"
        )}
      />
      <div className="absolute inset-y-0 right-1.5 flex items-center">
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={cn(
            "rounded-lg px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200",
            "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 shadow-md",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          )}
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
