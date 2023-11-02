import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBooktList } from "../../app/cityhall/fetchBooktList";
import { CityHallBookType } from "../../app/types/CityHallBookType";

type ResponseData =
  | {
      Page: number;
      BookList: CityHallBookType[];
      TotalCount: number;
      TotalPage: number;
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const result = await fetchBooktList({
      index: req.body.index,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
