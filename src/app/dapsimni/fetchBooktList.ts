import axios from "axios";
import { DapsimniBookType } from "../types/DapsimniBookType";

export const fetchBooktList = (params: {
  index: number;
  category_nickname_key?: string;
}) => {
  return axios
    .get<{
      LoanPossibleBookCount: number;
      BookList: DapsimniBookType[];
      TotalCount: number;
      TotalPage: number;
    }>(`http://smart.l4d.or.kr:8091/smartLibrary/getBookDataImpl`, {
      params: {
        status: "search",
        current_count: params.index,
        page_count: 18,
        menu: "all",
        category_nickname_key: params.category_nickname_key || "all",
      },
    })
    .then(({ data }) => {
      return data;
    });
};
