import { Header } from "../components/Header";
import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const HapjeongPage = async () => {
  const { data } = await fetchBooktList({ index: 1 });

  return (
    <div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <Header title="합정역 스마트 도서관" />
        <p>위치: 합정역</p>
      </div>

      <BookList listData={data} />
    </div>
  );
};

export default HapjeongPage;
