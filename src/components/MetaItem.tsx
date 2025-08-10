import { ReactNode } from 'react';
import { Typography } from 'antd';

import styles from '@/styles/MetaItem.module.scss';

const { Text } = Typography;

export interface MetaItemProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

export const MetaItem = ({ icon, label, value }: MetaItemProps) => {
  return (
    <div className={styles.container}>
      {icon}
      <Text type="secondary">{label}</Text>
      <Text>{value}</Text>
    </div>
  );
};
