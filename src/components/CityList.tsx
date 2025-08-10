'use client';

import { Row, Col, Empty } from 'antd';

import CityCard from '@/components/CityCard';
import { City } from '@/types/weather';

interface CityListProps {
  cities: City[];
  onCityRemove: (cityName: string) => void;
}

const CityList = ({ cities, onCityRemove }: CityListProps) => {
  if (!cities.length) {
    return <Empty description="No cities yet. Add your first city above." />;
  }

  return (
    <Row gutter={[16, 16]}>
      {cities.map((city) => (
        <Col key={city.name} xs={24} sm={12} md={8} lg={6}>
          <CityCard city={city} onRemove={onCityRemove} />
        </Col>
      ))}
    </Row>
  );
};

export default CityList;
