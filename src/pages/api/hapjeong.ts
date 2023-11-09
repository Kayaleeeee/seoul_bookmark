import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { HapjeongBookType } from "@/app/types/HapjeongBookType";

export enum BookStatus {
  unavailable = 0,
  avaliable = 1,
}

type ResponseData =
  | {
      pageIdx: number;
      data: HapjeongBookType[];
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

    if (key === "title") {
      url += `&title=${params[key]}`;
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

    const data = await axios
      .post<{
        result: {
          pageIdx: number;
          data: HapjeongBookType[];
          last_page: number;
          count: number;
          pageSize: number;
        };
      }>(
        `https://smartlib.mapo.go.kr:9525/api/book/getBookList?&pageSize=18&smartlib=1${parsingUrl(
          params
        )}`
      )
      .then(({ data: { result } }) => {
        return result;
      });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
