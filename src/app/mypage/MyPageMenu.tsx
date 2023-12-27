"use client";

import { apiClient } from "@app/lib/api/apiClient";
import { UserType } from "@app/types/Auth/UserType";
import { BookMarkType } from "@app/types/Bookmark/BookMarkType";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCallback } from "react";

type Props = {
  userInfo: {
    user: UserType;
    bookmark: BookMarkType[];
  };
};

export const MyPageMenu = ({ userInfo }: Props) => {
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    try {
      await apiClient.post("/user/logout");
      router.replace("/");
      toast.success("로그아웃 되었습니다.");
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="w-full flex flex-col font-bold p-4 text-xl">
        {[
          {
            title: "내 북마크",
            value: userInfo.bookmark.length,
            path: "/bookmark",
          },
        ].map((item, index) => {
          return (
            <div
              key={index}
              className={`flex-1 flex content-center justify-between py-5 px-1 mx-2 border-b-2 border-black `}
              onClick={() => router.push(item.path)}
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
