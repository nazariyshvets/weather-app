'use client';

import { useState, useEffect } from 'react';

import { City } from '@/types/weather';

const STORAGE_KEY = 'weather-app-cities';

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);

  // Load cities from localStorage on mount
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

  // Save cities to localStorage whenever cities change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  }, [cities]);

  const addCity = (cityName: string) => {
    const normalizedCityName = cityName.trim();
    if (!normalizedCityName) {
      return;
    }

    const existingCity = cities.find(
      (city) => city.name.toLowerCase() === normalizedCityName.toLowerCase()
    );

    if (existingCity) {
      throw new Error('City already exists');
    }

    const newCity: City = {
      name: normalizedCityName,
      country: '',
    };

    setCities((prev) => [...prev, newCity]);
  };

  const removeCity = (cityName: string) => {
    setCities((prev) => prev.filter((city) => city.name !== cityName));
  };

  const updateCityWeather = (cityName: string, weatherData: any) => {
    setCities((prev) =>
      prev.map((city) =>
        city.name === cityName ? { ...city, weatherData } : city
      )
    );
  };

  const updateCityForecast = (cityName: string, forecastData: any) => {
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
