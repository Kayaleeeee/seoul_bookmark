"use client";

import { HapjeongBookType } from "../types/HapjeongBookType";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { ListModeFilter } from "../components/ListModeFilter/ListModeFilter";
import { useListModeFilter } from "../components/ListModeFilter/useListModeFilter";
import { PictureBookListItem } from "../components/PictureBookListItem";
import { TextBooktListItem } from "../components/TextBookListItem";
import { Spacer } from "../components/Spacer";
import { fetchBooktList } from "./fetchBooktList";
import { Loader } from "../components/Loader/Loader";

type Props = {
  listData: {
    pageIdx: number;
    data: HapjeongBookType[];
    last_page: number;
    count: number;
    pageSize: number;
  };
};

export const BookList = ({ listData }: Props) => {
  const [list, setList] = useState<HapjeongBookType[]>(listData.data);
  const [pageNumber, setPageNumber] = useState<number>(listData.pageIdx);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listMode, onChangeListMode } = useListModeFilter();

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      if (listData.last_page <= pageNumber) return;

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
        {list.map((item, index) => {
          if (listMode === "picture")
            return (
              <PictureBookListItem
                key={`${item.title}_${index}`}
                imageUrl={`https://api.enicom.co.kr/book/api/image?isbn=${item.isbn}`}
                title={item.title}
                author={item.author}
                isAvailable={item.state_nm === "대출가능"}
              />
            );

          return (
            <TextBooktListItem
              key={`${item.title}_${index}`}
              isAvailable={item.state_nm === "대출가능"}
              title={item.title}
              author={item.author}
            />
          );
        })}
        {pageNumber <= listData.last_page && !isLoading ? (
          <div id="trigger_container" />
        ) : (
          <div
            style={{
              padding: "20px",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};
