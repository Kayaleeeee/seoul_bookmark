import { Header } from "../components/Header";
import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const CityhallPage = async () => {
  const { data: listData } = await fetchBooktList({ index: 1 });

  return (
    <div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <Header title={"시청역 스마트 도서관"} />
      </div>
      <BookList listData={listData} />
    </div>
  );
};

export default CityhallPage;
