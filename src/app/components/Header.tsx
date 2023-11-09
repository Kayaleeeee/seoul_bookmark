"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = {
  color?: string;
};

export const Header = ({ color, ...props }: PropsWithChildren<Props>) => {
  const router = useRouter();

  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "fixed",

        top: 0,
        left: 0,
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: color,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "10px" }} onClick={router.back}>
            <Image
              src="/icon/chevron-left-100.png"
              width={30}
              height={30}
              alt="left icon"
            />
          </div>
          {props.children}
        </div>
      </div>
    </header>
  );
};
