# Weather Intelligence App

A responsive, single-page weather application built with a stunning "Frosted Glass" UI design theme. It provides real-time weather data, a 7-day forecast, interactive temperature trend charts, and intelligent planning recommendations.

## Features

- **Real-Time Weather:** Get instant current weather conditions for any city globally.
- **7-Day Forecast:** View the upcoming week's weather with maximum and minimum temperatures.
- **Interactive Charts:** Visualize temperature trends over the next 7 days using dynamic area charts.
- **Smart Recommendations:** Receive actionable daily insights based on the current weather (e.g., "Looks like rain, grab an umbrella!").
- **Dynamic Theming:** The app automatically switches between Day and Night modes depending on the current time at the searched location, and features an immersive, animated rain overlay during rainy conditions.
- **Frosted Glass UI:** A modern, clean, and premium aesthetic that adapts beautifully to both light and dark modes.

## Tech Stack

- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts
- **Icons:** Lucide React
- **Weather API:** [Open-Meteo](https://open-meteo.com/) (Geocoding & Forecast APIs - No API key required)

## Deployment Workflow

### 1. Google AI Studio to GitHub
* The app was generated using **Google AI Studio App Build**.
* The source code was exported directly to this GitHub repository using the built-in **Push to GitHub / Export to GitHub** feature. 

### 2. Cloudflare Pages Deployment
This app is hosted on Cloudflare Pages. To deploy or redeploy:
* Log in to Cloudflare and navigate to **Workers & Pages**.
* Click **Create application** -> **Pages** -> **Connect to Git**.
* Select this GitHub repository.
* Use the following build settings:
  * **Framework preset**: `Vite` (or `None`)
  * **Build command**: `npm run build`
  * **Build output directory**: `dist`

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.

## License

MIT License
