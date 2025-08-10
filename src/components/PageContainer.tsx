import { ReactNode } from 'react';

import styles from '@/styles/PageContainer.module.scss';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};
