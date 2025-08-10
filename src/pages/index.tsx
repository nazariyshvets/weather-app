import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Typography, Modal } from 'antd';

import { useCities } from '@/hooks/useCities';
const CityAddForm = dynamic(() => import('@/components/CityAddForm'), {
  ssr: false,
});
const CityList = dynamic(() => import('@/components/CityList'), { ssr: false });

import styles from '@/styles/Home.module.scss';

const { Title } = Typography;

interface ModalState {
  isOpen: boolean;
  cityToRemove: string | null;
}

const INITIAL_MODAL_STATE: ModalState = {
  isOpen: false,
  cityToRemove: null,
};

const HomePage = () => {
  const { cities, addCity, removeCity } = useCities();
  const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

  const handleModalOpen = (city: string) => {
    setModalState({ isOpen: true, cityToRemove: city });
  };

  const handleModalClose = () => {
    setModalState(INITIAL_MODAL_STATE);
  };

  const handleCityRemove = () => {
    const cityToRemove = modalState.cityToRemove;

    if (cityToRemove) {
      removeCity(cityToRemove);
    }

    handleModalClose();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather</title>
      </Head>

      <div className={styles.header}>
        <Title level={1} className={styles.title}>
          Weather
        </Title>
        <CityAddForm onCityAdd={addCity} />
      </div>

      <CityList cities={cities} onCityRemove={handleModalOpen} />

      <Modal
        title="Remove city"
        open={modalState.isOpen}
        onCancel={handleModalClose}
        onOk={handleCityRemove}
        okType="danger"
      >
        Are you sure you want to remove the <b>{modalState.cityToRemove}</b>{' '}
        city?
      </Modal>
    </div>
  );
};

export default HomePage;
