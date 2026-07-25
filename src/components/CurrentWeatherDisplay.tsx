import React from 'react';
import { Cloud, CloudLightning, CloudRain, CloudSun, CloudFog, Snowflake, Sun } from 'lucide-react';
import { CurrentWeather, Location, getWeatherDescription, getWeatherIcon } from '../lib/weather';

interface CurrentWeatherDisplayProps {
  location: Location;
  weather: CurrentWeather;
}

export const WeatherIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  switch (iconName) {
    case 'sun': return <Sun className={className} />;
    case 'cloud-sun': return <CloudSun className={className} />;
    case 'cloud': return <Cloud className={className} />;
    case 'smog': return <CloudFog className={className} />;
    case 'cloud-rain': return <CloudRain className={className} />;
    case 'snowflake': return <Snowflake className={className} />;
    case 'cloud-lightning': return <CloudLightning className={className} />;
    default: return <Cloud className={className} />;
  }
};

export function CurrentWeatherDisplay({ location, weather }: CurrentWeatherDisplayProps) {
  const iconName = getWeatherIcon(weather.weathercode);
  const description = getWeatherDescription(weather.weathercode);

  return (
    <div className="glass p-8 flex flex-col items-center text-center w-full relative z-10">
      <h2 className="text-3xl font-semibold mb-2 text-slate-800 dark:text-slate-100">
        {location.name}
      </h2>
      <div className="text-[64px] my-2">
         <WeatherIcon iconName={iconName} className="w-20 h-20 text-blue-500 dark:text-blue-400 drop-shadow-md" />
      </div>
      <div className="text-[84px] font-extralight leading-none my-4 text-slate-800 dark:text-white tracking-tighter">
        {Math.round(weather.temperature)}°
      </div>
      <div className="text-xl font-medium capitalize text-slate-600 dark:text-slate-300">{description}</div>
    </div>
  );
}
