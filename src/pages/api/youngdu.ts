import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { YongduBookType } from "@/app/types/YongduBookType";

type ResponseData =
  | {
      pageIdx: number;
      data: YongduBookType[];
      last_page: number;
      count: number;
      pageSize: number;
    }
  | { error: string };

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
      `http://smart.l4d.or.kr:9525/api/book/getBookList?pageIdx=${params.index}&pageSize=18&smartlib=1&`
    );
    res.status(200).json(data.result);
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
