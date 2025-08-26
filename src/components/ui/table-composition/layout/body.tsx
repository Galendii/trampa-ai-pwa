import React from "react";
// import styles from './layout.module.scss';

type BodyProps = {
  children: React.ReactNode;
};

export const Body = ({ children }: BodyProps) => <tbody>{children}</tbody>;
