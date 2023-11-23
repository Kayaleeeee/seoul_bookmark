import React from "react";
import { fetchBookDetail } from "./fetchBookDetail";

import { BookContentDetail } from "@app/_components/BookContentDetail/BookContentDetail";

const YongduDetailPage = async ({
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
      <BookContentDetail
        author={bookDetail.author}
        title={bookDetail.title}
        publisher={bookDetail.publisher}
        imageUrl={bookDetail.image_url}
        description={bookDetail.description}
        isAvailable={bookDetail.state_nm !== "대출중"}
      />
    </div>
  );
};

export default YongduDetailPage;
