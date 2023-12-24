"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = {
  color?: string;
  hasBackButton?: boolean;
};

export const Header = ({
  color,
  hasBackButton = true,
  ...props
}: PropsWithChildren<Props>) => {
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
        zIndex: 2,
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
            minHeight: "60px",
            padding: "10px",
            backgroundColor: color,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {hasBackButton && (
            <div style={{ marginRight: "10px" }} onClick={router.back}>
              <Image
                src="/icon/arrow-left.svg"
                width={30}
                height={30}
                alt="left icon"
              />
            </div>
          )}
          {props.children}
        </div>
      </div>
    </header>
  );
};
