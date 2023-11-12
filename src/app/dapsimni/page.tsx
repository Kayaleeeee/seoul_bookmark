import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const DapsimniPage = async () => {
  const { data } = await fetchBooktList({ index: 1 });

  return <BookList listData={data} />;
};

export default DapsimniPage;
