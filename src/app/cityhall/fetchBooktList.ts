import axios from "axios";
import * as cheerio from "cheerio";

const mobileUserAgent =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1";

const desktopUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36";

export const fetchBooktList = async (params: {
  index: number;
  category_nickname_key?: string;
}) => {
  return axios.post(`${process.env.api}/cityhall`, params);
};
