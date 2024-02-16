import React from "react";
import { fetchBookDetail } from "./fetchBookDetail";

import { BookContentDetail } from "@app/_components/BookContentDetail/BookContentDetail";

const CityHallDetailPage = async ({
  params,
}: {
  params: { bookNumber: string };
}) => {
  const {
    data: { bookDetail },
  } = await fetchBookDetail({
    book_no: params.bookNumber,
  });

  return (
    <div
      style={{
        background: "pink",
        minHeight: "100svh",
      }}
    >
      <BookContentDetail
        id={params.bookNumber}
        author={bookDetail.author}
        title={bookDetail.title}
        publisher={bookDetail.publisher}
        imageUrl={bookDetail.imageUrl}
        description={bookDetail.description}
        isAvailable={bookDetail.isAvailable}
        location="시청"
      />
    </div>
  );
};

export default CityHallDetailPage;
