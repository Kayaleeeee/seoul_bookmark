import React from "react";
import { fetchBookDetail } from "./fetchBookDetail";

import { BookContentDetail } from "@app/_components/BookContentDetail/BookContentDetail";

const HapjeongDetailPage = async ({
  params,
}: {
  params: { bookNumber: string };
}) => {
  const {
    bookDetail: { bookDetail },
    isSaved,
  } = await fetchBookDetail({
    book_no: params.bookNumber.split("_")[0],
    isbn: params.bookNumber.split("_")[1],
  });

  return (
    <div
      style={{
        background: "pink",
        minHeight: "100svh",
      }}
    >
      <BookContentDetail
        id={params.bookNumber.split("_")[0]}
        author={bookDetail.author}
        title={bookDetail.title}
        publisher={bookDetail.publisher}
        imageUrl={bookDetail.image_url}
        description={bookDetail.description}
        isAvailable={bookDetail.state_nm !== "대출중"}
        location="합정"
        isSaved={isSaved}
      />
    </div>
  );
};

export default HapjeongDetailPage;
