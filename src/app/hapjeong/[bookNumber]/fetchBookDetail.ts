import axios from "axios";

export const fetchBookDetail = (params: { book_no: string; isbn: string }) => {
  return axios.post(`${process.env.api}/hapjeong/detail`, params);
};
