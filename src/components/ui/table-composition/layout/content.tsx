import React from "react";

import classNames from "classnames";

import styles from "./layout.module.scss";

type ContentProps = {
  isStriped?: boolean | false;
  className?: string | "";
  children: React.ReactNode;
};

export const Content = ({ isStriped, className, children }: ContentProps) => (
  <table
    className={classNames(styles.table, className, isStriped && styles.striped)}
  >
    {children}
  </table>
);
