import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { YongduBookType } from "@app/types/YongduBookType";

type ResponseData =
  | {
      pageIdx: number;
      data: YongduBookType[];
      last_page: number;
      count: number;
      pageSize: number;
    }
  | { error: string };

const parsingUrl = (params: Record<string, any>) => {
  let url = "";

  Object.keys(params).forEach((key) => {
    if (key === "index") {
      url += `&pageIdx=${params[key]}`;
    }

    if (key === "bookStatus") {
      url += `&searchState=${params[key]}`;
    }

    if (key === "searchWord") {
      url += `&searchWord=${params[key]}&searchItem=2`;
    }
  });

  return url;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const params = req.body;

    const { data } = await axios.post<{
      result: {
        pageIdx: number;
        data: YongduBookType[];
        last_page: number;
        count: number;
        pageSize: number;
      };
    }>(
      `http://smart.l4d.or.kr:9525/api/book/getBookList?pageSize=18&smartlib=1${parsingUrl(
        params
      )}`
    );
    res.status(200).json(data.result);
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
