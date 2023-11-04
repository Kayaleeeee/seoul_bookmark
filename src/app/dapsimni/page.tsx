import { Header } from "../components/Header";
import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const DapsimniPage = async () => {
  const { data } = await fetchBooktList({ index: 1 });

  return (
    <div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <Header title="답십리 스마트 도서관" />
      </div>
      <BookList listData={data} />
    </div>
  );
};

export default DapsimniPage;
