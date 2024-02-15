"use client";

import Image from "next/image";
import { Spacer } from "../Spacer";

import { BookStatusBadge } from "../BookStatusBadge/BookStatusBadge";

import { useCase_toggle_bookmark } from "@app/_usecases/bookmark/useCase_toggle_bookmark";
import { useState } from "react";
import { MenuHeader } from "../MenuHeader/MenuHeader";

type Props = {
  id: string;
  author: string;
  title: string;
  publisher: string;
  isAvailable: boolean;
  imageUrl: string;
  description: string;
  location: string;
  isSaved?: boolean;
};
export const BookContentDetail = ({
  id,
  author,
  title,
  isAvailable,
  publisher,
  imageUrl,
  description,
  location,
  isSaved = false,
}: Props) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(isSaved);

  const run_toggle_bookmark = useCase_toggle_bookmark(setIsBookmarked);

  return (
    <>
      <div className="h-20">
        <MenuHeader />
      </div>
      <div className="flex-col justify-center bg-white border-y-2 border-black">
        <div className="flex flex-row content-center border-b-2 border-black">
          <div
            className="relative shrink-0 border-black"
            style={{
              width: "180px",
              height: "250px",
            }}
          >
            {!!imageUrl && (
              <Image fill src={imageUrl} alt={"book thumbnail"} unoptimized />
            )}
          </div>
          <div className="px-3 py-2 border-l-2 border-black">
            <div className="text-xl font-medium mb-3">{title}</div>
            <div className="font-medium">
              <div className="mb-2">{author}</div>
              <div>{publisher}</div>
            </div>
            <Spacer space="1rem" />

            <div className="flex">
              <BookStatusBadge isAvailable={isAvailable} />
            </div>
            <Spacer space="1rem" />
          </div>
        </div>

        <div className="p-4">
          <Spacer space="1rem" />
          <div className="text-lg">{description}</div>
          <Spacer space="2rem" />
        </div>

        <Spacer space="1rem" />

        <div className="flex flex-row border-t-2 border-black ">
          <div
            onClick={() =>
              run_toggle_bookmark(
                {
                  id,
                  author,
                  title,
                  isAvailable,
                  imageUrl,
                  location,
                },
                isBookmarked
              )
            }
            className={`flex-1 text-lg p-4 font-bold text-center`}
          >
            북마크 {isBookmarked ? "빼기" : "담기"}
          </div>
          <div className="flex-1 text-lg p-4 font-bold text-center border-l border-black">
            별점 남기기
          </div>
        </div>
      </div>
    </>
  );
};
