"use client";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { BookStatus, DapsimniBookType } from "../types/DapsimniBookType";
import { ListModeFilter } from "../_components/ListModeFilter/ListModeFilter";
import { useListModeFilter } from "../_components/ListModeFilter/useListModeFilter";
import { Spacer } from "../_components/Spacer";
import { PictureBookListItem } from "../_components/PictureBookListItem";
import { TextBooktListItem } from "../_components/TextBookListItem";
import { fetchBooktList } from "./fetchBooktList";
import { Loader } from "../_components/Loader/Loader";
import { Header } from "../_components/Header";
import { libraryList } from "../contants";
import { SearchFilterBar } from "../_components/SearchFilterBar/SearchFilterBar";
import { DropdownItemType } from "../_components/Dropdown/Dropdown";
import { scrollToTop } from "../utils/scrollToTop";
import { useSearchFilterBar } from "../_components/SearchFilterBar/useSearchFilterBar";

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
    LoanPossibleBookCount: number;
    BookList: DapsimniBookType[];
    TotalCount: number;
    TotalPage: number;
  };
};

export const BookList = ({ listData }: Props) => {
  const { color } = libraryList["dapsimni"];
  const [list, setList] = useState<DapsimniBookType[]>(listData.BookList);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listMode, onChangeListMode } = useListModeFilter();

  const { changeBookFilter, changeKeyword, keyword, bookStatusFilter } =
    useSearchFilterBar<DropdownItemType<BookStatus | undefined>>(
      bookFilterMenuList[0]
    );

  const fetchInitialPageWithParmas = async ({
    book_status,
    keyword,
  }: {
    book_status?: BookStatus;
    keyword?: string;
  }) => {
    setIsLoading(true);

    const { data } = await fetchBooktList({
      index: 1,
      book_status,
      keyword,
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
      book_status: bookStatus.value,
    });
  };

  const searchBookKeyword = () => {
    fetchInitialPageWithParmas({
      keyword,
      book_status: bookStatusFilter.value,
    });
  };

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      if (listData.TotalPage <= pageNumber) return;

      setIsLoading(true);

      const { data } = await fetchBooktList({
        index: pageNumber + 1,
        keyword,
        book_status: bookStatusFilter.value,
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
        {pageNumber <= listData.TotalCount && !isLoading ? (
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
