import axios from "axios";
import { BookStatus, DapsimniBookType } from "../types/DapsimniBookType";

export const fetchBooktList = (params: {
  index: number;
  category_nickname_key?: string;
  book_status?: BookStatus;
  keyword?: string;
}) => {
  return axios.post<{
    LoanPossibleBookCount: number;
    BookList: DapsimniBookType[];
    TotalCount: number;
    TotalPage: number;
  }>(`${process.env.api}/dapsimni`, params);
};
