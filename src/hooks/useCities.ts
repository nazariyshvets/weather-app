'use client';

import { useState, useEffect, useRef } from 'react';

import { City, ForecastData, WeatherData } from '@/types/weather';

const STORAGE_KEY = 'weather-app-cities';

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    const savedCities = localStorage.getItem(STORAGE_KEY);
    if (savedCities) {
      try {
        setCities(JSON.parse(savedCities));
      } catch (error) {
        console.error('Failed to parse saved cities:', error);
        setCities([]);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    } else {
      isMounted.current = true;
    }
  }, [cities]);

  const addCity = (cityName: string) => {
    const normalizedCityName = cityName.trim();
    if (!normalizedCityName) {
      throw new Error('City name is required');
    }

    const existingCity = cities.find(
      (city) => city.name.toLowerCase() === normalizedCityName.toLowerCase()
    );

    if (existingCity) {
      throw new Error('City already exists');
    }

    const newCity: City = {
      name: normalizedCityName,
    };

    setCities((prev) => [...prev, newCity]);
  };

  const removeCity = (cityName: string) => {
    setCities((prev) => prev.filter((city) => city.name !== cityName));
  };

  const updateCityWeather = (cityName: string, weatherData: WeatherData) => {
    setCities((prev) =>
      prev.map((city) =>
        city.name === cityName ? { ...city, weatherData } : city
      )
    );
  };

  const updateCityForecast = (cityName: string, forecastData: ForecastData) => {
    setCities((prev) =>
      prev.map((city) =>
        city.name === cityName ? { ...city, forecastData } : city
      )
    );
  };

  return {
    cities,
    addCity,
    removeCity,
    updateCityWeather,
    updateCityForecast,
  };
};
