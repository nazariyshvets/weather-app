import Head from 'next/head';
import { useRouter } from 'next/router';
import { Typography, Card, Skeleton, Alert } from 'antd';

import { TempLineChart } from '@/components/TempLineChart';
import { useWeatherQuery, useForecastQuery } from '@/hooks/useWeatherQueries';
import { filterTodayTemps } from '@/utils/common';

import styles from '@/styles/CityDetails.module.scss';

const { Title, Text } = Typography;

const CityDetailsPage = () => {
  const router = useRouter();

  const cityName =
    typeof router.query.name === 'string' ? router.query.name : '';

  const {
    data: weather,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useWeatherQuery(cityName);

  const {
    data: forecast,
    isLoading: isForecastLoading,
    isError: isForecastError,
  } = useForecastQuery(cityName);

  const todays = forecast?.list.filter((x) => filterTodayTemps(x.dt_txt)) ?? [];

  return (
    <div className={styles.container}>
      <Head>
        <title>{cityName} · Weather</title>
      </Head>

      <Title level={2} className={styles.title}>
        {cityName}
      </Title>

      <Card>
        {isWeatherLoading ? (
          <Skeleton active />
        ) : isWeatherError || !weather ? (
          <Alert type="error" message="Failed to load current weather" />
        ) : (
          <div className={styles.now}>
            <Text className={styles.nowTemp}>
              {Math.round(weather.main.temp)}°C
            </Text>
            <Text type="secondary">{weather.weather[0].description}</Text>
          </div>
        )}
      </Card>

      <Card title="Today (hourly)">
        {isForecastLoading ? (
          <Skeleton active />
        ) : isForecastError || !forecast ? (
          <Alert type="error" message="Failed to load forecast" />
        ) : todays.length === 0 ? (
          <Text type="secondary">No hourly data available.</Text>
        ) : (
          <TempLineChart
            data={todays.map((p) => ({
              time: p.dt_txt.slice(11, 16),
              temp: p.main.temp,
            }))}
          />
        )}
      </Card>
    </div>
  );
};

export default CityDetailsPage;
