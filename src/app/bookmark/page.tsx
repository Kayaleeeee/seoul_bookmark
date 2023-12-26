import { MenuHeader } from "@app/_components/MenuHeader/MenuHeader";

import { BookmarkList } from "./BookmarkList";
import { apiServer } from "@app/lib/api/apiServer";
import { Bookmark } from "@model/Book/Bookmark";

const BookmarkPage = async () => {
  const fetch_bookmark = async () => {
    const { data } = await apiServer.get<{ bookmarkList: Bookmark[] }>(
      "/user/bookmark"
    );
    return data.bookmarkList;
  };

  const bookmarkList = await fetch_bookmark();

  return (
    <div className="h-full flex flex-col">
      <MenuHeader />
      <span className="appTitle mt-8 mb-4 p-3">
        My <br />
        <div className="flex flex-row">
          Bookmark
          <div className="font-thin">({bookmarkList.length})</div>
        </div>
      </span>
      <div className="flex flex-1 ">
        <BookmarkList bookmarkList={bookmarkList} />
      </div>
    </div>
  );
};

export default BookmarkPage;
