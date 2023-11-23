import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { YongduBookDetailType } from "@app/types/YongduBookType";

type ResponseData =
  | {
      bookDetail: YongduBookDetailType;
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const params = req.body;

    const data = await axios
      .post<{
        result: {
          info: YongduBookDetailType;
        };
      }>(
        `http://smart.l4d.or.kr:9525/api/book/getBookDetail?book_no=${params.book_no}&isbn=${params.isbn}`,
        req.body
      )
      .then(({ data: { result } }) => {
        return result;
      });
    res.status(200).json({ bookDetail: data.info });
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
