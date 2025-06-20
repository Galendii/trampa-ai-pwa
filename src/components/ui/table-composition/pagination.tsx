import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./pagination.module.scss";

type PaginationProps = {
  next: () => void;
  previous: () => void;
  Numbers: number[];
  current: number;
  jump: (page: number) => void;
};

export const Pagination = ({
  Numbers,
  current,
  jump,
  next,
  previous,
}: PaginationProps) => {
  /**  const mount = () => {
    const pages: any[] = [];

    for (let index = 0; index < Numbers.length; index++) {
      const page = Numbers[index];

      if (page < current + 4 && page > current - 4) {
        pages.push(page);
      }
    }
    if (current > 4 && pages[0] !== '..') pages.unshift('..');
    if (current < Numbers.length - 4) pages.push('..');

    return pages.map((page: number | string, i: number) =>
      page === '..' ? (
        <p className={styles['pagination-dots']} key={page}>
          {page}
        </p>
      ) : (
        <button
          className={styles['pagination-option']}
          onClick={() => jump(page as number)}
          data-active={current === page}
          key={i}
        >
          {page}
        </button>
      )
    );
  };
  */

  return (
    <div className={styles["pagination-overlay"]}>
      <div className={styles["pagination-content"]}>
        <div className={styles["numbers-indicator"]}>
          <span className={styles.indicator}>
            {String(current)} of {String(Numbers.length)} pages
          </span>
        </div>
        <div className={styles["chevrons-container"]}>
          <button
            className={styles.chevron}
            onClick={previous}
            data-active={current !== 1}
            disabled={current === 1}
          >
            <ChevronLeft
              className={styles["chevron-icon"]}
              data-active={current > 1}
            />
          </button>
          <button
            className={styles.chevron}
            onClick={next}
            data-active={current !== Numbers.length}
            disabled={current === Numbers.length}
          >
            <ChevronRight
              className={styles["chevron-icon"]}
              data-active={current !== Numbers.length}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

/** <div className={styles['pagination-options-container']}>{mount()}</div> */
