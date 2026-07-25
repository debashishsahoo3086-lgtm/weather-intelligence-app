import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DailyForecast } from '../lib/weather';

interface TemperatureChartProps {
  daily: DailyForecast;
  isDay?: boolean;
}

export function TemperatureChart({ daily, isDay = true }: TemperatureChartProps) {
  const days = daily.time.slice(0, 7);
  
  const data = days.map((time, index) => {
    const date = new Date(time);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    
    return {
      day: dayName,
      fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      max: Math.round(daily.temperature_2m_max[index]),
      min: Math.round(daily.temperature_2m_min[index]),
    };
  });

  return (
    <div className="glass p-6 w-full h-[300px] flex flex-col relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="m-0 text-lg font-semibold text-slate-800 dark:text-slate-100">Temperature Trend</h2>
        <div className="flex gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Daytime High
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
            Nighttime Low
          </span>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={isDay ? 0.4 : 0.8}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDay ? '#64748b' : 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass p-3 border-white/60 dark:border-white/10 shadow-xl bg-white/90 dark:bg-slate-900/50 backdrop-blur-xl">
                      <p className="font-medium text-slate-800 dark:text-white mb-1">{payload[0].payload.fullDate}</p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          High: {payload[0].value}°C
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="max" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMax)" 
              activeDot={{ r: 6, fill: '#3b82f6', stroke: isDay ? '#ffffff' : '#0f172a', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
