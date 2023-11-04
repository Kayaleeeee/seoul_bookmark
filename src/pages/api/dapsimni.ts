import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { DapsimniBookType } from "@/app/types/DapsimniBookType";

type ResponseData =
  | {
      LoanPossibleBookCount: number;
      BookList: DapsimniBookType[];
      TotalCount: number;
      TotalPage: number;
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const params = req.body;
    const { data } = await axios.get<{
      LoanPossibleBookCount: number;
      BookList: DapsimniBookType[];
      TotalCount: number;
      TotalPage: number;
    }>(`http://smart.l4d.or.kr:8091/smartLibrary/getBookDataImpl`, {
      params: {
        status: "search",
        current_count: params.index,
        page_count: 18,
        menu: "all",
        category_nickname_key: params.category_nickname_key || "all",
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
