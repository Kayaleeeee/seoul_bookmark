import axios from "axios";
import { YongduBookType } from "../types/YongduBookType";

export const fetchBooktList = (index: number) => {
  return axios
    .post<{
      result: {
        pageIdx: number;
        data: YongduBookType[];
        last_page: number;
        count: number;
        pageSize: number;
      };
    }>(
      `http://smart.l4d.or.kr:9525/api/book/getBookList?pageIdx=${index}&pageSize=18&smartlib=1&`
    )
    .then(({ data: { result } }) => {
      return result;
    });
};
