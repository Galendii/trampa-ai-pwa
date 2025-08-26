import React from "react";

import { Search as SearchIcon, XSquare as XSquareIcon } from "lucide-react";

import { useKeyListener } from "@/hooks/useKeyListener";

import styles from "./addons.module.scss";

type SearchProps = {
  handleSearch: (value: string) => void;
  placeholder?: string;
};

export const Search = ({ handleSearch, placeholder }: SearchProps) => {
  const [search, setSearch] = React.useState("");

  useKeyListener("Enter", () => handleSearch(search));

  const reset = () => {
    setSearch("");
    handleSearch("");
  };

  return (
    <div className={styles.search}>
      <SearchIcon className={styles["search-icon"]} />
      <input
        value={search}
        className={styles["search-input"]}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder ?? "Pesquisar"}
      />
      {search.length > 0 && <XSquareIcon onClick={reset} size={18} />}
    </div>
  );
};
