import {
  filterTodayTemps,
  degreesToCompass,
  metersToKm,
  formatLocalTime,
  getMetaItems,
} from '@/utils/common';

import { WeatherData } from '@/types/weather';

describe('utils/common', () => {
  it('filterTodayTemps returns true for today', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    expect(filterTodayTemps(`${yyyy}-${mm}-${dd} 12:00:00`)).toBe(true);
  });

  it('degreesToCompass converts degrees to cardinal', () => {
    expect(degreesToCompass(0)).toBe('N');
    expect(degreesToCompass(90)).toBe('E');
    expect(degreesToCompass(180)).toBe('S');
    expect(degreesToCompass(270)).toBe('W');
  });

  it('metersToKm formats properly', () => {
    expect(metersToKm(1234)).toBe('1.2 km');
  });

  it('formatLocalTime formats with timezone offset', () => {
    // 00:00 UTC with no offset
    const midnightUtc = 0;
    expect(formatLocalTime(midnightUtc, 0)).toBe('00:00');
  });

  it('getMetaItems builds items from weather', () => {
    const weather: WeatherData = {
      coord: {
        lon: 25.6056,
        lat: 49.5559,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      base: 'stations',
      main: {
        temp: 20.5,
        feels_like: 20.8,
        temp_min: 20.5,
        temp_max: 20.5,
        pressure: 1018,
        humidity: 84,
        sea_level: 1018,
        grnd_level: 979,
      },
      visibility: 10000,
      wind: {
        speed: 4.49,
        deg: 321,
        gust: 10.3,
      },
      clouds: {
        all: 70,
      },
      dt: 1754848942,
      sys: {
        country: 'UA',
        sunrise: 1754794874,
        sunset: 1754847886,
      },
      timezone: 10800,
      id: 691650,
      name: 'Ternopil',
      cod: 200,
    };

    const items = getMetaItems(weather);
    expect(items.length).toBeGreaterThan(5);
    expect(items.find((i) => i.label === 'Feels like')?.value).toBe('21°C');
  });
});
