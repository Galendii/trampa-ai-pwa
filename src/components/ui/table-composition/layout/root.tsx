import classNames from 'classnames';
import React from 'react';

import styles from './layout.module.scss';

type RootProps = {
  containerClassName?: string | '';
  withBorder?: boolean | false;
  children: React.ReactNode;
};

export const Root = ({ containerClassName, withBorder, children }: RootProps) => (
  <div className={classNames(styles.container, withBorder && styles.border, containerClassName)}>
    {children}
  </div>
);
