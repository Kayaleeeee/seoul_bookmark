import { useState } from "react";

export const useSearchFilterBar = <FilterStatus,>(
  defaultMenu: FilterStatus
) => {
  const [keyword, setKeyword] = useState<string>("");
  const [bookStatusFilter, setBookStatusFilter] =
    useState<FilterStatus>(defaultMenu);

  return {
    changeBookFilter: setBookStatusFilter,
    changeKeyword: setKeyword,
    keyword,
    bookStatusFilter,
  };
};
