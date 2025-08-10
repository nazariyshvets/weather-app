'use client';

import {
  Card,
  Button,
  Typography,
  Space,
  Skeleton,
  Tooltip,
  message,
} from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

import { useWeatherQuery } from '@/hooks/useWeatherQueries';
import { weatherService } from '@/services/weatherService';
import { City } from '@/types/weather';

import styles from '@/styles/CityCard.module.scss';

const { Title, Text } = Typography;

interface CityCardProps {
  city: City;
  onRemove: (name: string) => void;
}

export const CityCard = ({ city, onRemove }: CityCardProps) => {
  const { data, isLoading, isError, refetch, isRefetching } = useWeatherQuery(
    city.name
  );

  const handleRefresh = () => {
    try {
      refetch();
      message.success('Refresh was successful');
    } catch {
      message.error('Something went wrong during refresh');
    }
  };

  return (
    <Card
      hoverable
      title={
        <div className={styles.header}>
          <Title level={4} ellipsis className={styles.title}>
            {city.name}
          </Title>
          <Space>
            <Tooltip title="Refresh now">
              <Button
                size="small"
                onClick={handleRefresh}
                loading={isRefetching}
              >
                <SyncOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Remove city">
              <Button size="small" danger onClick={() => onRemove(city.name)}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        </div>
      }
      style={{ width: '100%' }}
    >
      <Link href={`/city/${encodeURIComponent(city.name)}`}>
        <div className={styles.content}>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 1 }} title={false} />
          ) : isError || !data ? (
            <Text type="danger">Failed to load weather</Text>
          ) : (
            <>
              <Image
                src={weatherService.getWeatherIconUrl(data.weather[0].icon)}
                alt={data.weather[0].description}
                width={48}
                height={48}
                className={styles.icon}
              />
              <div className={styles.meta}>
                <Text>{data.weather[0].main}</Text>
                <Text>
                  {weatherService.formatTemperature(data.main.temp)} · Humidity{' '}
                  {weatherService.formatHumidity(data.main.humidity)} · Wind{' '}
                  {weatherService.formatWindSpeed(data.wind.speed)}
                </Text>
              </div>
            </>
          )}
        </div>
      </Link>
    </Card>
  );
};
