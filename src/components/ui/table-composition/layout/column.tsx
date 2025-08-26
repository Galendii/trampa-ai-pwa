import React from "react";

import { SortAsc } from "lucide-react";

import styles from "./layout.module.scss";

type ColumnProps = {
  children: React.ReactNode;
  sort: () => void;
  isSorted?: boolean | false;
};

export const Column = ({ children, sort, isSorted }: ColumnProps) => (
  <th>
    {children}
    {isSorted && (
      <button onClick={sort} className={styles["table-column-sort"]}>
        <SortAsc size={12} />
      </button>
    )}
  </th>
);
