import axios from "axios";
import { Header } from "../components/Header";
import { BookList } from "./BookList";

const CityhallPage = async () => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://steady-conkies-7a74ef.netlify.app";

  const { data: listData } = await axios.post(`${url}/api/cityhall`, {
    index: 1,
  });

  const loadMore = async (index: number) => {
    "use server";

    const { data } = await axios.post(`${url}/api/cityhall`, {
      index,
    });
    return data;
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <Header title={"시청역 스마트 도서관"} />
      </div>
      <BookList listData={listData} loadMore={loadMore} />
    </div>
  );
};

export default CityhallPage;
