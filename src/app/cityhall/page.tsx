import axios from "axios";
import { Header } from "../components/Header";
import { BookList } from "./BookList";

const CityhallPage = async () => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://steady-conkies-7a74ef.netlify.app";

  return (
    <div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <Header title={"시청역 스마트 도서관"} />
      </div>
      <BookList />
    </div>
  );
};

export default CityhallPage;
