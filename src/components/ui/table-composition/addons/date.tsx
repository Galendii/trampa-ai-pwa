import React from "react";

import { format } from "date-fns";
import { Calendar } from "lucide-react";

import styles from "./addons.module.scss";

type DateProps = {
  date: Date;
  label?: string;
  pattern?: string;
};

export const Date = ({ date, label, pattern }: DateProps) => (
  <React.Fragment>
    {date !== null ? (
      <span className={styles["date-span"]}>
        <Calendar size={14} className={styles["date-icon"]} />
        {format(date, pattern ?? "dd/MM/yyyy  HH:mm")}
        {label && <strong className={styles["date-label"]}>{label}</strong>}
      </span>
    ) : (
      <p>NULL</p>
    )}
  </React.Fragment>
);
