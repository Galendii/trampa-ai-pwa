import React from "react";

import styles from "./layout.module.scss";

type OverlayProps = {
  withBorder?: boolean | false;
  children: React.ReactNode;
};

export const Overlay = ({ withBorder, children }: OverlayProps) => (
  <div className={withBorder ? styles.border : null}>{children}</div>
);
