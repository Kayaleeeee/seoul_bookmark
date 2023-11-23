import axios from "axios";
import { BookStatus } from "../types/YongduBookType";

export const fetchBooktList = (params: {
  index: number;
  searchWord?: string;
  bookStatus?: BookStatus;
}) => {
  return axios.post(`${process.env.api}/yongdu/list`, params);
};
