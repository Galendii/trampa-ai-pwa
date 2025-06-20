import React from 'react';
// import styles from './layout.module.scss';

type HeaderProps = {
  children: React.ReactNode;
};

export const Header = ({ children }: HeaderProps) => <thead>{children}</thead>;
