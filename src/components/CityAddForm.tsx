'use client';

import { useState } from 'react';
import { Button, Form, Input, Space, message } from 'antd';

import { usePrefetchWeather } from '@/hooks/useWeatherQueries';

import styles from '@/styles/CityAddForm.module.scss';

interface CityAddFormProps {
  onCityAdd: (cityName: string) => void;
}

interface FormValues {
  city: string;
}

const CityAddForm = ({ onCityAdd }: CityAddFormProps) => {
  const [form] = Form.useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefetchWeather = usePrefetchWeather();

  const handleAdd = async (values: FormValues) => {
    const cityName = values.city?.trim();

    if (!cityName) {
      message.warning('Please enter a city name');
      return;
    }

    try {
      setIsSubmitting(true);

      onCityAdd(cityName);
      prefetchWeather(cityName);

      message.success(`Added ${cityName}`);
      form.resetFields();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add city';
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleAdd}
      className={styles.form}
    >
      <Space.Compact>
        <Form.Item name="city" className={styles.field}>
          <Input
            allowClear
            placeholder="Add a city (e.g., Kyiv, London)"
            onPressEnter={() => form.submit()}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Add
        </Button>
      </Space.Compact>
    </Form>
  );
};

export default CityAddForm;
