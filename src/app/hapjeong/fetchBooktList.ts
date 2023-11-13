import axios from "axios";
import { BookStatus } from "../types/HapjeongBookType";

export const fetchBooktList = (params: {
  index: number;
  bookStatus?: BookStatus;
  title?: string;
  category_nickname_key?: string;
}) => {
  return axios.post(`${process.env.api}/hapjeong/list`, params);
};
