import { WeatherData, ForecastData } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_OPENWEATHER_API_KEY is not defined');
}

export const weatherService = {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for ${city}`);
    }

    return response.json();
  },

  async getForecast(city: string): Promise<ForecastData> {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch forecast data for ${city}`);
    }

    return response.json();
  },

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  },

  formatTemperature(temp: number): string {
    return `${Math.round(temp)}°C`;
  },

  formatWindSpeed(speed: number): string {
    return `${Math.round(speed)} m/s`;
  },

  formatHumidity(humidity: number): string {
    return `${humidity}%`;
  },
};
