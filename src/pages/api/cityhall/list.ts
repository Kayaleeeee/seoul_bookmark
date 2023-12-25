import type { NextApiRequest, NextApiResponse } from "next";

import { CityHallBookType } from "@app/types/CityHallBookType";

import axios from "axios";
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
    const params = req.body;
    const pageSize = 20;

    const startNumber = (params.index - 1) * pageSize;
    const endNumber = params.index * pageSize - 1;

    const result = await axios
      .get<{
        LibOwndataSmart: {
          list_total_count: number;
          RESULT: {
            CODE: string;
            MESSAGE: string;
          };
          row: {
            DATA_CD: string;
            REG_NO: string;
            DATA_TTL: string;
            AUT: string;
            PUBLER: string;
            PBLCN_YR: string;
            CLM_NO: string;
            CLSF_NO: string;
            LANG: string;
            LANG_NM: string;
            NTN_NM: string;
            OWNSHP_CD: string;
            OWNSHP_NM: "서울도서관";
            LCTN_CD: string;
            LCTN_NM: "스마트도서관(시청역)";
            LOAN_STTS: string;
            LOAN_STTS_MSG: string;
          }[];
        };
      }>(
        `http://openapi.seoul.go.kr:8088/${
          process.env.SEOUL_API_KEY
        }/json/LibOwndataSmart/${startNumber}/${endNumber}/${
          params.bookTitle || ""
        }`
      )
      .then(({ data }) => {
        return {
          Page: params.index,
          TotalCount: Number(data.LibOwndataSmart.list_total_count),
          TotalPage: Math.ceil(
            Number(data.LibOwndataSmart.list_total_count) / pageSize
          ),
          BookList: data.LibOwndataSmart.row.map((book) => {
            return {
              id: book.DATA_CD,
              author: book.AUT,
              title: book.DATA_TTL,
              publisher: book.PUBLER,
              isAvailable: book.LOAN_STTS_MSG === "대출가능",
              detailUrl: "",
              imageUrl: "",
            };
          }),
        };
      });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
