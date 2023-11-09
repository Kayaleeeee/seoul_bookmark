import { BookList } from "./BookList";
import { fetchBooktList } from "./fetchBooktList";

const HapjeongPage = async () => {
  const { data } = await fetchBooktList({ index: 1 });

  return (
    <div>
      <BookList listData={data} />
    </div>
  );
};

export default HapjeongPage;
