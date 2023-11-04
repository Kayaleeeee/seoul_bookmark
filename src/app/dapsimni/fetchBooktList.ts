import axios from "axios";
import { DapsimniBookType } from "../types/DapsimniBookType";

export const fetchBooktList = (params: {
  index: number;
  category_nickname_key?: string;
}) => {
  return axios.post<{
    LoanPossibleBookCount: number;
    BookList: DapsimniBookType[];
    TotalCount: number;
    TotalPage: number;
  }>(`${process.env.api}/dapsimni`, params);
};
