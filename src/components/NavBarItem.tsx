'use client';

import Link from 'next/link';
import { ComponentType } from 'react';
import { Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import styles from '@/styles/NavBarItem.module.scss';

const { Title } = Typography;

type NavBarItemType = 'home';

interface NavBarItemProps {
  type: NavBarItemType;
}

const TYPE_TO_PROPS_MAP: Record<
  NavBarItemType,
  { href: string; Icon: ComponentType; label: string }
> = {
  home: { href: '/', Icon: HomeOutlined, label: 'Home' },
};

export const NavBarItem = ({ type }: NavBarItemProps) => {
  const { href, Icon, label } = TYPE_TO_PROPS_MAP[type];

  return (
    <Link href={href}>
      <Title level={4} className={styles.title}>
        <Icon /> {label}
      </Title>
    </Link>
  );
};
