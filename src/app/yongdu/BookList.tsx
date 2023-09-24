"use client";

import Image from "next/image";
import { YongduBookType } from "../types/YongduBookType";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";

type Props = {
  listData: {
    pageIdx: number;
    data: YongduBookType[];
    last_page: number;
    count: number;
    pageSize: number;
  };
  loadMore: (index: number) => Promise<{
    pageIdx: number;
    data: YongduBookType[];
    last_page: number;
    count: number;
    pageSize: number;
  }>;
};

export const BookList = ({ listData, loadMore }: Props) => {
  const [list, setList] = useState<YongduBookType[]>(listData.data);
  const [pageNumber, setPageNumber] = useState<number>(listData.pageIdx);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      setIsLoading(true);

      const response = await loadMore(pageNumber + 1);
      setList((prev) => prev.concat(response.data));
      setPageNumber(response.pageIdx);
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
          <div key={item.book_no} className="bookItem">
            <Image
              fill
              src={`https://api.enicom.co.kr/book/api/image?isbn=${item.isbn}`}
              alt={item.book_no + " thumbnail"}
            />
          </div>
        );
      })}
      {pageNumber < listData.last_page && <div id="trigger_container" />}
    </div>
  );
};
