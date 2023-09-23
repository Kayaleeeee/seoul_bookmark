import axios from "axios";
import { HapjeongBookType } from "../types/HapjeongBookType";
import { error } from "console";

export const fetchBooktList = (index: number) => {
  return axios
    .post<{
      result: {
        pageIdx: number;
        data: HapjeongBookType[];
        last_page: number;
        count: number;
        pageSize: number;
      };
    }>(
      `https://smartlib.mapo.go.kr:9525/api/book/getBookList?pageIdx=${index}&pageSize=18&smartlib=1&`
    )
    .then(({ data: { result } }) => {
      return result;
    });
};
