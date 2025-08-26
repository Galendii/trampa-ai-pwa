import React from "react";
// import styles from './layout.module.scss';

type CellProps = {
  children: React.ReactNode;
};

export const Cell = ({ children }: CellProps) => <td>{children}</td>;
