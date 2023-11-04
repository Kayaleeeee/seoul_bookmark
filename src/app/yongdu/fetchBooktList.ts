import axios from "axios";

export const fetchBooktList = (params: {
  index: number;
  category_nickname_key?: string;
}) => {
  return axios.post(`${process.env.api}/youngdu`, params);
};
