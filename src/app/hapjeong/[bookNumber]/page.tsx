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
      <div
        style={{
          height: "80px",
        }}
      >
        <Header>
          <div
            style={{
              height: "40px",
            }}
          ></div>
        </Header>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "180px",
            height: "220px",
            zIndex: 2,
            borderRadius: "16px",
            boxShadow: "1px 2px 4px -1px rgba(89,78,78,0.5);",
          }}
        >
          <Image
            fill
            style={{
              borderRadius: "16px",
            }}
            src={bookDetail.image_url}
            alt={"book thumbnail"}
            unoptimized
          />
        </div>
        <div
          style={{
            width: "90%",
            height: "calc(100vh - 280px)",
            minHeight: "400px",

            padding: "36px 24px 16px 24px",
            background: "white",
            position: "absolute",
            top: "200px",
            borderRadius: "20px 20px 0 0",
            boxShadow: `0px 20px 21px 15px rgba(122,122,122,0.25)`,
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {bookDetail.title}
          </div>
          <Spacer space="1rem" />

          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: 500,
              }}
            >
              {bookDetail.author}
            </div>
            <div>{bookDetail.publisher}</div>
          </div>
          <Spacer space="1rem" />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
