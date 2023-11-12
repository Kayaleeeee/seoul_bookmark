import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const CityhallPage = async () => {
  const { data: listData } = await fetchBooktList({ index: 1 });

  return <BookList listData={listData} />;
};

export default CityhallPage;
