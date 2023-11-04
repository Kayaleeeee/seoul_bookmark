import { Header } from "../components/Header";
import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const YongduPage = async () => {
  const { data } = await fetchBooktList({ index: 1 });

  return (
    <div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <Header title="용두역 스마트 도서관" />
      </div>
      <BookList listData={data} />
    </div>
  );
};

export default YongduPage;
