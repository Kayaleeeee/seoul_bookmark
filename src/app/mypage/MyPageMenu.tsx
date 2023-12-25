"use client";

import { apiClient } from "@app/lib/api/apiClient";
import { UserType } from "@app/types/Auth/UserType";
import { BookType } from "@app/types/Bookmark/BookType";
import { useRouter } from "next/navigation";

import { useCallback } from "react";

type Props = {
  userInfo: {
    user: UserType;
    bookmark: BookType[];
  };
};

export const MyPageMenu = ({ userInfo }: Props) => {
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    try {
      await apiClient.post("/user/logout");
      router.replace("/");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="w-full flex flex-col font-bold p-4 text-xl">
        {[
          {
            title: "내 북마크",
            value: userInfo.bookmark.length,
          },
          { title: "즐겨찾는 도서관", value: 10 },
        ].map((item, index) => {
          return (
            <div
              key={index}
              className={`flex-1 flex content-center justify-between py-5 px-1 mx-2 border-b-2 border-black `}
            >
              <div className="content-center">{item.title}</div>
              <div>{item.value}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-5" onClick={handleLogout}>
        로그아웃
      </div>
    </div>
  );
};
