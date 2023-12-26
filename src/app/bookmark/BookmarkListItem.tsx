import { BookMarkType } from "@app/types/Bookmark/BookMarkType";
import Image from "next/image";
import { FC } from "react";

export const BookmarkListItem: FC<{ bookmark: BookMarkType }> = ({
  bookmark,
}) => {
  return (
    <div
      key={bookmark.id}
      className="p-4 border border-black mb-4 rounded-2xl flex flex-row"
    >
      {bookmark.imageUrl && (
        <div className="shrink-0 mr-3">
          <Image
            src={bookmark.imageUrl}
            width={70}
            height={80}
            unoptimized
            alt="bookmark thumbnail"
          />
        </div>
      )}
      <div className="flex flex-col">
        <div className="text-xl font-black mb-2 font-white">
          {bookmark.title}
        </div>
        <div className="mb-1">{bookmark.author}</div>
        {bookmark.createdAt && (
          <div className="font-light">
            {new Date(bookmark.createdAt).toLocaleDateString()} 저장
          </div>
        )}
        <div className="font-light">{bookmark.location} 스마트 도서관</div>
      </div>
    </div>
  );
};
