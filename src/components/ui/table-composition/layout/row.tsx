import React from 'react';
// import styles from './layout.module.scss';

type RowProps = {
  className?: string | '';
  children: React.ReactNode;
};

export const Row = ({ children, className }: RowProps) => <tr className={className}>{children}</tr>;
