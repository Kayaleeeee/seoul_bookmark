"use client";

import { YongduBookType } from "../types/YongduBookType";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { useListModeFilter } from "../components/ListModeFilter/useListModeFilter";
import { ListModeFilter } from "../components/ListModeFilter/ListModeFilter";
import { Spacer } from "../components/Spacer";
import { TextBooktListItem } from "../components/TextBookListItem";
import { PictureBookListItem } from "../components/PictureBookListItem";
import { fetchBooktList } from "./fetchBooktList";

type Props = {
  listData: {
    pageIdx: number;
    data: YongduBookType[];
    last_page: number;
    count: number;
    pageSize: number;
  };
};

export const BookList = ({ listData }: Props) => {
  const [list, setList] = useState<YongduBookType[]>(listData.data);
  const [pageNumber, setPageNumber] = useState<number>(listData.pageIdx);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listMode, onChangeListMode } = useListModeFilter();

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      setIsLoading(true);

      const { data } = await fetchBooktList({ index: pageNumber + 1 });
      setList((prev) => prev.concat(data.data));
      setPageNumber(data.pageIdx);
      setIsLoading(false);
    },
  });

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "inline-flex",
          justifyContent: "flex-end",
        }}
      >
        <ListModeFilter
          currentMode={listMode}
          onChangeMode={onChangeListMode}
        />
      </div>
      <Spacer space="15px" />
      <div className={`bookListContainer-${listMode}`}>
        {list.map((item) => {
          if (listMode === "picture")
            return (
              <PictureBookListItem
                key={item.book_no}
                imageUrl={`https://api.enicom.co.kr/book/api/image?isbn=${item.isbn}`}
                title={item.title}
                author={item.author}
                isAvailable={item.state_nm === "대출가능"}
              />
            );

          return (
            <TextBooktListItem
              key={item.book_no}
              title={item.title}
              author={item.author}
              isAvailable={item.state_nm === "대출가능"}
            />
          );
        })}

        {pageNumber < listData.last_page && <div id="trigger_container" />}
      </div>
    </>
  );
};
