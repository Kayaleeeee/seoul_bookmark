import { apiServer } from "@app/lib/api/apiServer";

export const fetchBookDetail = (params: { book_no: string }) => {
  return apiServer.post(`${process.env.api}/cityhall/detail`, params);
};
