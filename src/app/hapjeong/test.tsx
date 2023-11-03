"use client";

import { useState } from "react";
import { HapjeongBookType } from "../types/HapjeongBookType";

type Props = {
  loadMore: (index: number) => Promise<{
    pageIdx: number;
    data: HapjeongBookType[];
    last_page: number;
    count: number;
    pageSize: number;
  }>;
};

export const Test = ({ loadMore }: Props) => {
  const [count, setCount] = useState<number>(1);

  const onClick = async (index: number) => {
    try {
      const data = await loadMore(index);
      setCount((prev) => prev + 1);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={() => onClick(count)}>fetch</button>
      <div>{count}</div>
    </>
  );
};
