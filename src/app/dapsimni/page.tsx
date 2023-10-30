import { Header } from "../components/Header";
import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const DapsimniPage = async () => {
  const listData = await fetchBooktList({ index: 1 });

  const loadMore = async (index: number) => {
    "use server";
    return await fetchBooktList({ index });
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <Header title="답십리 스마트 도서관" />
      </div>
      <BookList listData={listData} loadMore={loadMore} />
    </div>
  );
};

export default DapsimniPage;
