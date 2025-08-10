import { ReactNode } from 'react';

import { NavBar } from '@/components/NavBar';

import styles from '@/styles/PageContainer.module.scss';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </>
  );
};
