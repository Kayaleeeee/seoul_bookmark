"use client";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { CityHallBookType } from "../types/CityHallBookType";
import { TextBooktListItem } from "../components/TextBookListItem";
import { PictureBookListItem } from "../components/PictureBookListItem";
import { ListModeFilter } from "../components/ListModeFilter/ListModeFilter";
import { useListModeFilter } from "../components/ListModeFilter/useListModeFilter";
import { Spacer } from "../components/Spacer";

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

  const { listMode, onChangeListMode } = useListModeFilter();

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      if (pageNumber >= listData.TotalPage) return;

      setIsLoading(true);

      const response = await loadMore(pageNumber + 1);
      setList((prev) => prev.concat(response.BookList));
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
                imageUrl={item.imageUrl}
                title={item.title}
                author={item.author}
                isAvailable={item.isAvailable}
              />
            );

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
    </>
  );
};
