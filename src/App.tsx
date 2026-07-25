import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherDisplay } from './components/CurrentWeatherDisplay';
import { ForecastCards } from './components/ForecastCards';
import { TemperatureChart } from './components/TemperatureChart';
import { Recommendations } from './components/Recommendations';
import { RainOverlay } from './components/RainOverlay';
import { getWeather, searchLocation, type Location, type WeatherData } from './lib/weather';

export default function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default to London on initial load just to show something nice
  useEffect(() => {
    handleSearch('London');
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const loc = await searchLocation(query);
      if (!loc) {
        setError('City not found. Please check the spelling and try again.');
        setLocation(null);
        setWeatherData(null);
        return;
      }
      
      setLocation(loc);
      const weather = await getWeather(loc.latitude, loc.longitude);
      setWeatherData(weather);
    } catch (err) {
      setError('An error occurred while fetching the weather data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDay = weatherData?.current_weather?.is_day !== 0; // Default true if undefined
  const isRain = weatherData ? [51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(weatherData.current_weather.weathercode) : false;

  return (
    <div className={isDay ? '' : 'dark'}>
      <div className="min-h-screen text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-500 relative">
        <div className="mesh-bg transition-colors duration-1000"></div>
        {isRain && <RainOverlay />}
        
        <header className="px-5 py-5 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
              W
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SkyCast AI</span>
          </div>
          <div className="flex-1 max-w-2xl w-full">
             <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <div className="hidden sm:flex gap-3">
            <div className="glass w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 transition-colors text-xl">
              {isDay ? '☀️' : '🌙'}
            </div>
            <div className="glass w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 transition-colors text-xl">⚙️</div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 py-6 sm:px-10 relative z-10">
          {/* Error State */}
          {error && (
            <div className="glass bg-red-100/50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 p-4 text-red-700 dark:text-red-200 text-center max-w-2xl mx-auto mb-8">
              {error}
            </div>
          )}

          {/* Loading State Skeleton */}
          {isLoading && !error && (
            <div className="w-full animate-pulse flex flex-col lg:flex-row gap-6">
               <div className="glass w-full lg:w-[320px] h-96 shrink-0 bg-white/40 dark:bg-white/5 border-slate-200 dark:border-white/10"></div>
               <div className="glass w-full flex-1 min-w-0 h-96 bg-white/40 dark:bg-white/5 border-slate-200 dark:border-white/10"></div>
            </div>
          )}

          {/* Main Content */}
          {!isLoading && location && weatherData && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col lg:flex-row gap-6">
              <section className="flex flex-col gap-6 w-full lg:w-[320px] shrink-0">
                 <CurrentWeatherDisplay location={location} weather={weatherData.current_weather} />
                 <Recommendations weather={weatherData.current_weather} />
              </section>
              
              <section className="flex flex-col gap-6 w-full flex-1 min-w-0">
                 <TemperatureChart daily={weatherData.daily} isDay={isDay} />
                 <ForecastCards daily={weatherData.daily} />
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
