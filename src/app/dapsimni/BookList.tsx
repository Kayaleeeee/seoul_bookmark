"use client";

import Image from "next/image";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { DapsimniBookType } from "../types/DapsimniBookType";

type Props = {
  listData: {
    LoanPossibleBookCount: number;
    BookList: DapsimniBookType[];
    TotalCount: number;
    TotalPage: number;
  };
  loadMore: (index: number) => Promise<{
    LoanPossibleBookCount: number;
    BookList: DapsimniBookType[];
    TotalCount: number;
    TotalPage: number;
  }>;
};

export const BookList = ({ listData, loadMore }: Props) => {
  const [list, setList] = useState<DapsimniBookType[]>(listData.BookList);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <div
      id="list_container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      {list.map((item) => {
        return (
          <div key={item.BOOK_ISBN} className="bookItem">
            <Image
              fill
              src={`http://smart.l4d.or.kr:8091${item.BOOK_IMAGE_URL}`}
              alt={item.BOOK_ISBN + " thumbnail"}
            />
          </div>
        );
      })}
      {pageNumber < listData.TotalCount && <div id="trigger_container" />}
    </div>
  );
};
