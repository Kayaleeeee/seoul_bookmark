import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const HapjeongPage = async () => {
  const { data } = await fetchBooktList({ index: 1 });

  return <BookList listData={data} />;
};

export default HapjeongPage;
