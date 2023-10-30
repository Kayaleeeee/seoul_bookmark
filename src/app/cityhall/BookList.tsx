"use client";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { CityHallBookType } from "../types/CityHallBookType";
import { TextBooktListItem } from "../components/TextBookListItem";

type Props = {
  listData: {
    Page: number;
    BookList: CityHallBookType[];
    TotalCount: number;
    TotalPage: number;
  };
  loadMore: (index: number) => Promise<{
    Page: number;
    BookList: CityHallBookType[];
    TotalCount: number;
    TotalPage: number;
  }>;
};

export const BookList = ({ listData, loadMore }: Props) => {
  const [list, setList] = useState<CityHallBookType[]>(listData.BookList);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookMode, setBookMode] = useState<"picture" | "text">("text");

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      setIsLoading(true);

      const response = await loadMore(pageNumber + 1);
      setList((prev) => prev.concat(response.BookList));
      setPageNumber((prev) => prev + 1);
      setIsLoading(false);
    },
  });

  return (
    <div className="textBookListContainer">
      {list.map((item, index) => {
        return (
          <TextBooktListItem
            key={`${item.title}_${index}`}
            isAvailable={item.isAvailable}
            title={item.title}
            author={item.author}
          />
        );
      })}
      {pageNumber < listData.TotalCount && <div id="trigger_container" />}
    </div>
  );
};
