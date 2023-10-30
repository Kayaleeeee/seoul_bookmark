import { Header } from "../components/Header";
import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const HapjeongPage = async () => {
  const listData = await fetchBooktList(1);

  const loadMore = async (index: number) => {
    "use server";
    return await fetchBooktList(index);
  };

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
      <BookList listData={listData} loadMore={loadMore} />
    </div>
  );
};

export default HapjeongPage;
