"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
};
export const Header = ({ title }: Props) => {
  const router = useRouter();
  return (
    <header
      style={{
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
      <h2 className="pageTitle">{title}</h2>
    </header>
  );
};
