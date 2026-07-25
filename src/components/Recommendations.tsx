import React from 'react';
import { CurrentWeather, getWeatherIcon } from '../lib/weather';

interface RecommendationsProps {
  weather: CurrentWeather;
}

export function Recommendations({ weather }: RecommendationsProps) {
  const icon = getWeatherIcon(weather.weathercode);
  const temp = weather.temperature;
  
  let recommendation = "";
  
  if (icon === 'sun') {
    if (temp > 25) {
      recommendation = "Clear skies and hot! Don't forget your sunglasses, sunscreen, and stay hydrated.";
    } else {
      recommendation = "Clear skies! Perfect weather for outdoor activities. Enjoy the sunshine.";
    }
  } else if (icon === 'cloud-rain' || icon === 'cloud-lightning') {
    recommendation = "Looks like rain. Grab an umbrella and a waterproof jacket before heading out.";
  } else if (icon === 'snowflake') {
    recommendation = "It's snowing! Bundle up warmly and drive safely if you need to go out.";
  } else if (icon === 'smog') {
    recommendation = "Foggy conditions. Drive carefully and use your fog lights if necessary.";
  } else {
    if (temp < 10) {
      recommendation = "It's quite chilly out there. Make sure to wear a warm coat.";
    } else if (temp > 30) {
      recommendation = "It's hot today! Keep cool, find some shade, and drink plenty of water.";
    } else {
      recommendation = "Pleasant weather today. A light jacket might be handy just in case.";
    }
  }

  return (
    <div className="glass p-6 bg-blue-100/50 dark:bg-blue-500/10 border-blue-300/50 dark:border-blue-500/20 relative z-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl drop-shadow-sm">💡</span>
        <span className="font-semibold text-lg text-blue-900 dark:text-blue-100">Daily Insight</span>
      </div>
      <p className="text-[15px] font-medium leading-relaxed text-blue-900/80 dark:text-blue-100/90 m-0">
        {recommendation}
      </p>
    </div>
  );
}
