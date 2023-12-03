import axios from "axios";
import { BookStatus } from "../types/CityHallBookType";

export const fetchBooktList = async (params: {
  index: number;
  bookStatus?: BookStatus;
}) => {
  return axios.post(`${process.env.api}/cityhall/list`, params);
};
