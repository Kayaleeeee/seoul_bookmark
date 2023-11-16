import { ListModeType } from "@app/types/ListTypeMode";
import { useState } from "react";

export const useListModeFilter = (defaulMode?: ListModeType) => {
  const [listMode, setListMode] = useState<ListModeType>(defaulMode || "text");

  const onChangeListMode = (mode: ListModeType) => {
    setListMode(mode);
  };

  return {
    onChangeListMode,
    listMode,
  };
};
