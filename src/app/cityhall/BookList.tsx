"use client";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { BookStatus, CityHallBookType } from "../types/CityHallBookType";
import { TextBooktListItem } from "../_components/TextBookListItem";
import { PictureBookListItem } from "../_components/PictureBookListItem";
import { ListModeFilter } from "../_components/ListModeFilter/ListModeFilter";
import { useListModeFilter } from "../_components/ListModeFilter/useListModeFilter";
import { Spacer } from "../_components/Spacer";
import { fetchBooktList } from "./fetchBooktList";
import { Loader } from "../_components/Loader/Loader";
import { Header } from "../_components/Header";
import { libraryList } from "../contants";
import { DropdownItemType } from "../_components/Dropdown/Dropdown";
import { scrollToTop } from "../utils/scrollToTop";
import { useSearchFilterBar } from "../_components/SearchFilterBar/useSearchFilterBar";
import { SearchFilterBar } from "../_components/SearchFilterBar/SearchFilterBar";

const bookFilterMenuList: DropdownItemType<BookStatus | undefined>[] = [
  {
    label: "전체",
    value: undefined,
  },
  {
    label: "대출가능",
    value: BookStatus.avaliable,
  },
  {
    label: "대출중",
    value: BookStatus.unavailable,
  },
];

type Props = {
  listData: {
    Page: number;
    BookList: CityHallBookType[];
    TotalCount: number;
    TotalPage: number;
  };
};

export const BookList = ({ listData }: Props) => {
  const { color } = libraryList["cityhall"];

  const [list, setList] = useState<CityHallBookType[]>(listData.BookList);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listMode, onChangeListMode } = useListModeFilter();

  const { changeBookFilter, changeKeyword, keyword, bookStatusFilter } =
    useSearchFilterBar<DropdownItemType<BookStatus | undefined>>(
      bookFilterMenuList[0]
    );

  const fetchInitialPageWithParmas = async ({
    bookStatus,
    keyword,
  }: {
    bookStatus?: BookStatus;
    keyword?: string;
  }) => {
    setIsLoading(true);

    const { data } = await fetchBooktList({
      index: 1,
      bookStatus,
    });

    setList(data.BookList || []);
    setPageNumber(1);
    setIsLoading(false);

    scrollToTop();
  };

  const changeBookStatusFilter = (
    bookStatus: DropdownItemType<BookStatus | undefined>
  ) => {
    changeBookFilter(bookStatus);
    fetchInitialPageWithParmas({
      keyword: keyword,
      bookStatus: bookStatus.value,
    });
  };

  const searchBookKeyword = () => {
    fetchInitialPageWithParmas({
      keyword,
      bookStatus: bookStatusFilter.value,
    });
  };

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      if (pageNumber >= listData.TotalPage) return;

      setIsLoading(true);

      const { data } = await fetchBooktList({
        index: pageNumber + 1,
        bookStatus: bookStatusFilter.value,
      });
      setList((prev) => prev.concat(data.BookList));
      setPageNumber((prev) => prev + 1);
      setIsLoading(false);
    },
  });

  return (
    <div className="p-4">
      <div
        style={{
          height: "80px",
        }}
      >
        <Header color={color}>
          <SearchFilterBar<BookStatus | undefined>
            onSearch={searchBookKeyword}
            onSelect={changeBookStatusFilter}
            changeKeyword={changeKeyword}
            keyword={keyword}
            selectedFilter={bookStatusFilter}
            menuList={bookFilterMenuList}
          />
        </Header>
      </div>
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
        {pageNumber <= listData.TotalPage && !isLoading ? (
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
    </div>
  );
};
