import {
  CloudOutlined,
  EyeOutlined,
  RiseOutlined,
  FallOutlined,
  ThunderboltOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DashboardOutlined,
  FlagOutlined,
  FieldTimeOutlined,
  FireOutlined,
} from '@ant-design/icons';

import { WeatherData } from '@/types/weather';
import { MetaItemProps } from '@/components/MetaItem';

export const filterTodayTemps = (dtTxt: string) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  return dtTxt.startsWith(`${yyyy}-${mm}-${dd}`);
};

export const formatLocalTime = (
  epochSeconds: number,
  timezoneOffsetSeconds: number
) => {
  const date = new Date((epochSeconds + timezoneOffsetSeconds) * 1000);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatLocalDate = (
  epochSeconds: number,
  timezoneOffsetSeconds: number
) => {
  const date = new Date((epochSeconds + timezoneOffsetSeconds) * 1000);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const degreesToCompass = (deg: number) => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

export const metersToKm = (meters: number) =>
  `${(meters / 1000).toFixed(1)} km`;

export const getMetaItems = (weather: WeatherData): MetaItemProps[] => {
  return [
    {
      icon: <FireOutlined />,
      label: 'Feels like',
      value: `${Math.round(weather.main.feels_like)}°C`,
    },
    {
      icon: <ArrowDownOutlined />,
      label: 'Min',
      value: `${Math.round(weather.main.temp_min)}°C`,
    },
    {
      icon: <ArrowUpOutlined />,
      label: 'Max',
      value: `${Math.round(weather.main.temp_max)}°C`,
    },
    {
      icon: <DashboardOutlined />,
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon: <CloudOutlined />,
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
    },
    {
      icon: <ThunderboltOutlined />,
      label: 'Cloudiness',
      value: `${weather.clouds.all}%`,
    },
    {
      icon: <FlagOutlined />,
      label: 'Wind',
      value: `${Math.round(weather.wind.speed)} m/s ${degreesToCompass(
        weather.wind.deg
      )}`,
    },
    {
      icon: <EyeOutlined />,
      label: 'Visibility',
      value: metersToKm(weather.visibility),
    },
    {
      icon: <RiseOutlined />,
      label: 'Sunrise',
      value: formatLocalTime(weather.sys.sunrise, weather.timezone),
    },
    {
      icon: <FallOutlined />,
      label: 'Sunset',
      value: formatLocalTime(weather.sys.sunset, weather.timezone),
    },
    {
      icon: <FieldTimeOutlined />,
      label: 'Updated',
      value: formatLocalTime(weather.dt, weather.timezone),
    },
  ];
};
