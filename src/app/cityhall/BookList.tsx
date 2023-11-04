"use client";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useCallback, useEffect, useState } from "react";
import { CityHallBookType } from "../types/CityHallBookType";
import { TextBooktListItem } from "../components/TextBookListItem";
import { PictureBookListItem } from "../components/PictureBookListItem";
import { ListModeFilter } from "../components/ListModeFilter/ListModeFilter";
import { useListModeFilter } from "../components/ListModeFilter/useListModeFilter";
import { Spacer } from "../components/Spacer";
import axios from "axios";

// type Props = {
//   listData: {
//     Page: number;
//     BookList: CityHallBookType[];
//     TotalCount: number;
//     TotalPage: number;
//   };
//   loadMore: (index: number) => Promise<{
//     Page: number;
//     BookList: CityHallBookType[];
//     TotalCount: number;
//     TotalPage: number;
//   }>;
// };

export const BookList = () => {
  const [list, setList] = useState<CityHallBookType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [TotalPage, setTotalPage] = useState<number | null>(null);

  const { listMode, onChangeListMode } = useListModeFilter();

  const loadMore = useCallback(async (index: number) => {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://steady-conkies-7a74ef.netlify.app";

    const { data } = await axios.post(`${url}/api/cityhall`, {
      index,
    });
    return data;
  }, []);

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      if (TotalPage && pageNumber >= TotalPage) return;

      setIsLoading(true);

      const response = await loadMore(pageNumber + 1);
      setList((prev) => prev.concat(response.BookList));
      setPageNumber((prev) => prev + 1);

      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsLoading(true);

    loadMore(1)
      .then((response) => {
        setList((prev) => prev.concat(response.BookList));
        setPageNumber((prev) => prev + 1);
        setTotalPage(response.TotalPage);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadMore]);

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
        {TotalPage && pageNumber < TotalPage && <div id="trigger_container" />}
      </div>
    </>
  );
};
