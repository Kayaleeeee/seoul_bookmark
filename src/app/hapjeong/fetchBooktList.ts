import { BookStatus } from "@/pages/api/hapjeong";
import axios from "axios";

export const fetchBooktList = (params: {
  index: number;
  bookStatus?: BookStatus;
  title?: string;
  category_nickname_key?: string;
}) => {
  return axios.post(`${process.env.api}/hapjeong`, params);
};
