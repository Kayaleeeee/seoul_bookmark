"use client";

import Image from "next/image";
import { Header } from "../Header";
import { Spacer } from "../Spacer";

import { BookStatusBadge } from "../BookStatusBadge/BookStatusBadge";

type Props = {
  author: string;
  title: string;
  publisher: string;
  isAvailable: boolean;
  imageUrl: string;
  description: string;
};
export const BookContentDetail = ({
  author,
  title,
  isAvailable,
  publisher,
  imageUrl,
  description,
}: Props) => {
  return (
    <>
      <div className="h-20">
        <Header />
      </div>
      <div className="flex-col justify-center bg-white border-y-2 border-black">
        <div className="flex flex-row content-center border-b-2 border-black">
          <div
            className="relative border-r-2 shrink-0 border-black"
            style={{
              width: "180px",
              height: "250px",
            }}
          >
            <Image fill src={imageUrl} alt={"book thumbnail"} unoptimized />
          </div>
          <div className="px-3 py-2">
            <div className="text-xl font-medium mb-3">{title}</div>
            <div className="font-medium">
              <div className="mb-2">{author}</div>
              <div>{publisher}</div>
            </div>
            <Spacer space="1rem" />

            <div className="flex">
              <BookStatusBadge isAvailable={isAvailable} />
            </div>
          </div>
        </div>

        <div className="p-4">
          <Spacer space="1rem" />
          <div className="text-lg">{description}</div>
          <Spacer space="2rem" />
        </div>

        <Spacer space="1rem" />

        <div className="flex flex-row border-t-2 border-black ">
          <div className="flex-1 text-lg p-4 font-bold border-r border-black text-center">
            북마크 {isAvailable ? "저장됨" : "저장하기"}
          </div>
          <div className="flex-1 text-lg p-4 font-bold text-center">
            별점 남기기
          </div>
        </div>
      </div>
    </>
  );
};
