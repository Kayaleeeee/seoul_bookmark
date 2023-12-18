"use client";

import { BookStatus, YongduBookType } from "../types/YongduBookType";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { useListModeFilter } from "../_components/ListModeFilter/useListModeFilter";
import { ListModeFilter } from "../_components/ListModeFilter/ListModeFilter";
import { Spacer } from "../_components/Spacer";
import { TextBooktListItem } from "../_components/TextBookListItem";
import { PictureBookListItem } from "../_components/PictureBookListItem";
import { fetchBooktList } from "./fetchBooktList";
import { Loader } from "../_components/Loader/Loader";
import { Header } from "../_components/Header";
import { libraryList } from "../contants";
import { scrollToTop } from "../utils/scrollToTop";
import { DropdownItemType } from "../_components/Dropdown/Dropdown";
import { SearchFilterBar } from "../_components/SearchFilterBar/SearchFilterBar";
import { useSearchFilterBar } from "../_components/SearchFilterBar/useSearchFilterBar";
import { useRouter } from "next/navigation";

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
    pageIdx: number;
    data: YongduBookType[];
    last_page: number;
    count: number;
    pageSize: number;
  };
};

export const BookList = ({ listData }: Props) => {
  const { color } = libraryList["yongdu"];
  const router = useRouter();

  const [list, setList] = useState<YongduBookType[]>(listData.data);
  const [pageNumber, setPageNumber] = useState<number>(listData.pageIdx);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listMode, onChangeListMode } = useListModeFilter();

  const { changeBookFilter, changeKeyword, keyword, bookStatusFilter } =
    useSearchFilterBar<DropdownItemType<BookStatus | undefined>>(
      bookFilterMenuList[0]
    );

  const moveToDetailPage = (bookNumber: string, isbn: string) => {
    router.push(`/yongdu/${bookNumber}_${isbn}`);
  };

  const fetchInitialPageWithParmas = async ({
    bookStatus,
    searchWord,
  }: {
    bookStatus?: BookStatus;
    searchWord?: string;
  }) => {
    setIsLoading(true);

    const { data } = await fetchBooktList({
      index: 1,
      bookStatus,
      searchWord,
    });

    setList(data.data);
    setPageNumber(data.pageIdx);
    setIsLoading(false);

    scrollToTop();
  };

  const changeBookStatusFilter = (
    bookStatus: DropdownItemType<BookStatus | undefined>
  ) => {
    changeBookFilter(bookStatus);
    fetchInitialPageWithParmas({
      searchWord: keyword,
      bookStatus: bookStatus.value,
    });
  };

  const searchBooksearchWord = () => {
    fetchInitialPageWithParmas({
      searchWord: keyword,
      bookStatus: bookStatusFilter.value,
    });
  };

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      setIsLoading(true);

      const { data } = await fetchBooktList({
        index: pageNumber + 1,
        bookStatus: bookStatusFilter?.value,
        searchWord: keyword,
      });
      setList((prev) => prev.concat(data.data));
      setPageNumber(data.pageIdx);
      setIsLoading(false);
    },
  });

  return (
    <div>
      <div
        style={{
          height: "80px",
        }}
      >
        <Header color={color}>
          <SearchFilterBar<BookStatus | undefined>
            onSearch={searchBooksearchWord}
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
        {list.map((item) => {
          if (listMode === "picture")
            return (
              <PictureBookListItem
                key={item.book_no}
                imageUrl={`https://api.enicom.co.kr/book/api/image?isbn=${item.isbn}`}
                title={item.title}
                author={item.author}
                isAvailable={item.state_nm === "대출가능"}
                onClick={() => moveToDetailPage(item.book_no, item.isbn)}
              />
            );

          return (
            <TextBooktListItem
              key={item.book_no}
              title={item.title}
              author={item.author}
              isAvailable={item.state_nm === "대출가능"}
              onClick={() => moveToDetailPage(item.book_no, item.isbn)}
            />
          );
        })}
        {pageNumber <= listData.last_page && !isLoading ? (
          <div id="trigger_container" />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
