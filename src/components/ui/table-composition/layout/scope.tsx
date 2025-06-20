import React from "react";

import styles from "./layout.module.scss";
import { ButtonProps } from "../../button";

type ScopeProps = {
  title?: string;
  actionButton?: React.ReactElement<ButtonProps>;
  children?: React.ReactNode;
};

export const Scope = ({ title, actionButton, children }: ScopeProps) => (
  <div className={styles.header}>
    {title ? (
      <React.Fragment>
        <h2 className={styles.title}>{title}</h2>
        {actionButton}
      </React.Fragment>
    ) : (
      children
    )}
  </div>
);
