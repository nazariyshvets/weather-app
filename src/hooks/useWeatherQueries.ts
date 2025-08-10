import { useQuery, useQueryClient } from '@tanstack/react-query';

import { weatherService } from '@/services/weatherService';
import { WeatherData, ForecastData } from '@/types/weather';

export const useWeatherQuery = (city: string) =>
  useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: () => weatherService.getCurrentWeather(city),
    enabled: !!city,
  });

export const usePrefetchWeather = () => {
  const queryClient = useQueryClient();
  return (city: string) =>
    queryClient.prefetchQuery({
      queryKey: ['weather', city],
      queryFn: () => weatherService.getCurrentWeather(city),
    });
};

export const useForecastQuery = (city: string) =>
  useQuery<ForecastData>({
    queryKey: ['forecast', city],
    queryFn: () => weatherService.getForecast(city),
    enabled: !!city,
  });
