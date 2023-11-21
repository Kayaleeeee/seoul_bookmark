import { Header } from "@app/_components/Header";
import React from "react";
import { fetchBookDetail } from "./fetchBookDetail";
import Image from "next/image";
import { Spacer } from "@app/_components/Spacer";
import { BookStatusBadge } from "@app/_components/BookStatusBadge/BookStatusBadge";

const HapjeongDetailPage = async ({
  params,
}: {
  params: { bookNumber: string };
}) => {
  const {
    data: { bookDetail },
  } = await fetchBookDetail({
    book_no: params.bookNumber.split("_")[0],
    isbn: params.bookNumber.split("_")[1],
  });

  return (
    <div
      style={{
        background: "pink",
        minHeight: "100vh",
      }}
    >
      <div className="h-20">
        <Header>
          <Spacer space="40px" />
        </Header>
      </div>
      <div className="flex justify-center relative">
        <div
          className="rounded-lg shadow-md relative"
          style={{
            width: "180px",
            height: "220px",
            zIndex: 2,
          }}
        >
          <Image
            className="rounded-lg"
            fill
            src={bookDetail.image_url}
            alt={"book thumbnail"}
            unoptimized
          />
        </div>
        <div className="detailBookContent">
          <div className="text-center text-xl font-medium">
            {bookDetail.title}
          </div>
          <Spacer space="1rem" />

          <div className="text-center font-medium">
            <div>{bookDetail.author}</div>
            <div>{bookDetail.publisher}</div>
          </div>
          <Spacer space="1rem" />

          <div className="flex justify-center">
            <BookStatusBadge isAvailable={bookDetail.state_nm !== "대출중"} />
          </div>
          <Spacer space="1rem" />

          <div>{bookDetail.description}</div>
        </div>
      </div>
    </div>
  );
};

export default HapjeongDetailPage;
