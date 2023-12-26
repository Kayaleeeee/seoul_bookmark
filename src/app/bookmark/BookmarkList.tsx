import { BookMarkType } from "@app/types/Bookmark/BookMarkType";
import Image from "next/image";
import { BookmarkListItem } from "./BookmarkListItem";

type Props = {
  bookmarkList: BookMarkType[];
};

export const BookmarkList = ({ bookmarkList }: Props) => {
  return (
    <div className="p-5 flex-col">
      {bookmarkList.length < 1 ? (
        <div className="flex flex-1 text-2xl font-light mt-40 justify-center ">
          📚 담아둔 책이 없습니다.
        </div>
      ) : (
        bookmarkList.map((bookmark, index) => {
          return (
            <BookmarkListItem
              key={`${bookmark.id}_${index}`}
              bookmark={bookmark}
            />
          );
        })
      )}
    </div>
  );
};
