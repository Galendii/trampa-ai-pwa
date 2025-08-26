import React from "react";

import { RefreshCw } from "lucide-react";

import styles from "./layout.module.scss";

type EmptyProps = {
  headline: string;
  paragraph: string;
  onReload?: () => void;
};

export const Empty = ({ headline, paragraph, onReload }: EmptyProps) => {
  const onHandleRefetchItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onReload && onReload();
  };

  return (
    <div className={styles["empty-wrapper"]}>
      <button
        className={styles["empty-icon"]}
        onClick={onHandleRefetchItems}
        disabled={!onReload}
      >
        <RefreshCw size={26} />
      </button>
      <div className={styles["empty-text"]}>
        <span className={styles["empty-headline"]}>{headline}</span>
        <p className={styles["empty-paragraph"]}>{paragraph}</p>
      </div>
    </div>
  );
};
