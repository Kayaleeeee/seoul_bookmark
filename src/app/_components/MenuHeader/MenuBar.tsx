"use client";

import { useEffect, useMemo, useState } from "react";
import "./menubar.css";
import { useRouter } from "next/navigation";
import { getIsLoginedFromClient } from "@app/lib/getIsLoginedFromClient";

type Props = {
  closeMenu: () => void;
};

export const MenuBar = ({ closeMenu }: Props) => {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getIsLoginedFromClient()
      .then(() => setIsLogined(true))
      .catch(() => setIsLogined(false));
  }, []);

  const menuList = useMemo(() => {
    if (isLogined) {
      return [
        { title: "홈", path: "/" },
        { title: "마이페이지", path: "/mypage" },
        { title: "북마크", path: "/bookmark" },
      ];
    }
    return [
      { title: "홈", path: "/" },
      { title: "로그인", path: "/login" },
    ];
  }, [isLogined]);

  return (
    <div>
      <div className="overlay" onClick={closeMenu} />
      <div className="menubar">
        {menuList.map((menu) => {
          return (
            <div
              key={menu.title}
              className="row"
              onClick={() => {
                router.push(menu.path);
                closeMenu();
              }}
            >
              {menu.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
