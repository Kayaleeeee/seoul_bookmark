"use client";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { DapsimniBookType } from "../types/DapsimniBookType";
import { ListModeFilter } from "../components/ListModeFilter/ListModeFilter";
import { useListModeFilter } from "../components/ListModeFilter/useListModeFilter";
import { Spacer } from "../components/Spacer";
import { PictureBookListItem } from "../components/PictureBookListItem";
import { TextBooktListItem } from "../components/TextBookListItem";
import { fetchBooktList } from "./fetchBooktList";

type Props = {
  listData: {
    LoanPossibleBookCount: number;
    BookList: DapsimniBookType[];
    TotalCount: number;
    TotalPage: number;
  };
};

export const BookList = ({ listData }: Props) => {
  const [list, setList] = useState<DapsimniBookType[]>(listData.BookList);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listMode, onChangeListMode } = useListModeFilter();

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      setIsLoading(true);

      const { data } = await fetchBooktList({ index: pageNumber + 1 });
      setList((prev) => prev.concat(data.BookList));
      setPageNumber((prev) => prev + 1);
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
                key={`${item.BOOK_TITLE}_${index}`}
                imageUrl={`http://smart.l4d.or.kr:8091${item.BOOK_IMAGE_URL}`}
                title={item.BOOK_TITLE}
                author={item.BOOK_AUTHOR}
                isAvailable={item.BOOK_STATUS === "대출가능"}
              />
            );

          return (
            <TextBooktListItem
              key={`${item.BOOK_TITLE}_${index}`}
              isAvailable={item.BOOK_STATUS === "대출가능"}
              title={item.BOOK_TITLE}
              author={item.BOOK_AUTHOR}
            />
          );
        })}
      </div>
      {pageNumber < listData.TotalCount && <div id="trigger_container" />}
    </>
  );
};
