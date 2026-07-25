export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  weathercode: number;
  time: string;
  is_day?: number;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyForecast;
  timezone: string;
}

export const getWeatherDescription = (code: number): string => {
  const codes: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzle: Dense",
    56: "Freezing Drizzle: Light",
    57: "Freezing Drizzle: Dense",
    61: "Rain: Slight",
    63: "Rain: Moderate",
    65: "Rain: Heavy",
    66: "Freezing Rain: Light",
    67: "Freezing Rain: Heavy",
    71: "Snow: Slight",
    73: "Snow: Moderate",
    75: "Snow: Heavy",
    77: "Snow grains",
    80: "Rain showers: Slight",
    81: "Rain showers: Moderate",
    82: "Rain showers: Violent",
    85: "Snow showers: Slight",
    86: "Snow showers: Heavy",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return codes[code] || "Unknown";
};

export const getWeatherIcon = (code: number) => {
  if (code === 0 || code === 1) return "sun";
  if (code === 2) return "cloud-sun";
  if (code === 3) return "cloud";
  if (code >= 45 && code <= 48) return "smog";
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "cloud-rain";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snowflake";
  if (code >= 95 && code <= 99) return "cloud-lightning";
  return "cloud";
};

export async function searchLocation(query: string): Promise<Location | null> {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`);
  if (!response.ok) throw new Error("Failed to fetch location");
  
  const data = await response.json();
  if (!data.results || data.results.length === 0) return null;
  
  return data.results[0];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
  if (!response.ok) throw new Error("Failed to fetch weather");
  
  return await response.json();
}
