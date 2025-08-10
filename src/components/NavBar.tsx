'use client';

import { Layout } from 'antd';

import { NavBarItem } from './NavBarItem';

import styles from '@/styles/NavBar.module.scss';

const { Header } = Layout;

export const NavBar = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.inner}>
        <NavBarItem type="home" />
      </div>
    </Header>
  );
};
