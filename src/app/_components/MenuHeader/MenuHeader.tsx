"use client";

import Image from "next/image";
import { Header } from "../Header";
import { useState } from "react";
import { MenuBar } from "./MenuBar";

type Props = {
  hasGoBack?: boolean;
};
export const MenuHeader = ({ hasGoBack = true }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="h-10">
        <Header hasBackButton={hasGoBack}>
          <div
            className="flex justify-end flex-1 mr-1"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Image
              src={"/icon/menu.svg"}
              alt="menuBar"
              width={30}
              height={30}
            />
          </div>
        </Header>
      </div>
      {isMenuOpen && <MenuBar closeMenu={() => setIsMenuOpen(false)} />}
    </div>
  );
};
