"use client";

import {
  BookStatus,
  HapjeongBookListItemType,
} from "../types/HapjeongBookType";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useState } from "react";
import { ListModeFilter } from "../_components/ListModeFilter/ListModeFilter";
import { useListModeFilter } from "../_components/ListModeFilter/useListModeFilter";
import { PictureBookListItem } from "../_components/PictureBookListItem";
import { TextBooktListItem } from "../_components/TextBookListItem";
import { Spacer } from "../_components/Spacer";
import { fetchBooktList } from "./fetchBooktList";
import { Loader } from "../_components/Loader/Loader";

import { Header } from "../_components/Header";
import { libraryList } from "../contants";
import { SearchFilterBar } from "../_components/SearchFilterBar/SearchFilterBar";
import { useSearchFilterBar } from "../_components/SearchFilterBar/useSearchFilterBar";
import { DropdownItemType } from "../_components/Dropdown/Dropdown";
import { scrollToTop } from "../utils/scrollToTop";
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
    data: HapjeongBookListItemType[];
    last_page: number;
    count: number;
    pageSize: number;
  };
};

export const BookList = ({ listData }: Props) => {
  const router = useRouter();
  const { color } = libraryList["hapjeong"];

  const [list, setList] = useState<HapjeongBookListItemType[]>(listData.data);
  const [pageNumber, setPageNumber] = useState<number>(listData.pageIdx);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listMode, onChangeListMode } = useListModeFilter();

  const { changeBookFilter, changeKeyword, keyword, bookStatusFilter } =
    useSearchFilterBar<DropdownItemType<BookStatus | undefined>>(
      bookFilterMenuList[0]
    );

  const moveToDetailPage = (bookNumber: string, isbn: string) => {
    router.push(`/hapjeong/${bookNumber}_${isbn}`);
  };

  const fetchInitialPageWithParmas = async ({
    bookStatus,
    title,
  }: {
    bookStatus?: BookStatus;
    title?: string;
  }) => {
    setIsLoading(true);

    const { data } = await fetchBooktList({
      index: 1,
      bookStatus,
      title,
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
      title: keyword,
      bookStatus: bookStatus.value,
    });
  };

  const searchBookKeyword = () => {
    fetchInitialPageWithParmas({
      title: keyword,
      bookStatus: bookStatusFilter.value,
    });
  };

  useInfiniteScroll({
    triggerElementId: "#trigger_container",
    containerElementId: "#list_container",
    onScroll: async () => {
      if (isLoading) return;

      if (listData.last_page <= pageNumber) return;

      setIsLoading(true);

      const { data } = await fetchBooktList({
        index: pageNumber + 1,
        bookStatus: bookStatusFilter?.value,
        title: keyword,
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
                key={`${item.title}_${index}`}
                imageUrl={`https://api.enicom.co.kr/book/api/image?isbn=${item.isbn}`}
                title={item.title}
                author={item.author}
                isAvailable={item.state_nm === "대출가능"}
                onClick={() => moveToDetailPage(item.book_no, item.isbn)}
              />
            );

          return (
            <TextBooktListItem
              key={`${item.title}_${index}`}
              isAvailable={item.state_nm === "대출가능"}
              title={item.title}
              author={item.author}
              onClick={() => moveToDetailPage(item.book_no, item.isbn)}
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
    </div>
  );
};
