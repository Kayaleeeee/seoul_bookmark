import { getIsLogined } from "@app/lib/getIsLogined";
import { apiServer } from "@app/lib/api/apiServer";

export const fetchBookDetail = async (params: {
  book_no: string;
  isbn: string;
}) => {
  let isSaved = false;
  const isLogined = await getIsLogined();

  const bookDetailData = await apiServer.post(
    `${process.env.api}/hapjeong/detail`,
    params
  );

  if (isLogined) {
    const { data } = await apiServer.get(`/user/bookmark/${params.book_no}`);
    isSaved = !!data.bookmark;
  }

  return {
    bookDetail: bookDetailData.data,
    isSaved,
  };
};
