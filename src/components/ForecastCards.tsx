import React from 'react';
import { DailyForecast, getWeatherDescription, getWeatherIcon } from '../lib/weather';
import { WeatherIcon } from './CurrentWeatherDisplay';

interface ForecastCardsProps {
  daily: DailyForecast;
}

export function ForecastCards({ daily }: ForecastCardsProps) {
  // Take only the next 7 days
  const days = daily.time.slice(0, 7);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="w-full relative z-10">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {days.map((time, index) => {
          const maxTemp = Math.round(daily.temperature_2m_max[index]);
          const minTemp = Math.round(daily.temperature_2m_min[index]);
          const code = daily.weathercode[index];
          const iconName = getWeatherIcon(code);
          const description = getWeatherDescription(code);
          
          return (
            <div 
              key={time}
              title={description}
              className="glass p-4 text-center flex flex-col gap-2 hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                {formatDate(time)}
              </span>
              <WeatherIcon 
                iconName={iconName} 
                className="w-8 h-8 mx-auto my-1 text-slate-400 dark:text-slate-300 group-hover:text-blue-500 dark:group-hover:text-white transition-colors" 
              />
              <div className="flex items-center justify-center gap-2 w-full mt-1">
                <span className="font-semibold text-base text-slate-800 dark:text-white">{maxTemp}°</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{minTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
