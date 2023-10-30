import { Header } from "../components/Header";
import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const YongduPage = async () => {
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
        <Header title="용두역 스마트 도서관" />
      </div>
      <BookList listData={listData} loadMore={loadMore} />
    </div>
  );
};

export default YongduPage;
