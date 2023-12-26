import type { NextApiRequest, NextApiResponse } from "next";

import { CityHallBookType } from "@app/types/CityHallBookType";
import * as cheerio from "cheerio";
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
    const result = await axios
      .get(`https://lib.seoul.go.kr/smartLibrary?pn=${params.index}`)
      .then(async ({ data }) => {
        const html = data;
        const $ = cheerio.load(html);
        const totalCountMatch = $("p.totalCnt").text().match(/\d+/);
        const totalCount = Number(totalCountMatch?.[0] || 0);

        const currentPageMatch = $("p.pageNum > span").text();
        const listItemCount = 100;
        const listData: any[] | PromiseLike<any[]> = [];

        $("tbody > tr").each((_, item) => {
          const title = $(item).find(".title").text().trim();
          const detailUrl = $(item).find("a").attr("href") || "";
          const author = $(item).find("td.author").text();
          const bookStatus = $(item).find("td.date").text();

          const parsedDetaliUrl = detailUrl.match(
            /\/search\/detail\/(\w+)/
          )?.[1];

          if (!params.bookStatus) {
            listData.push({
              title,
              detailUrl: parsedDetaliUrl,
              author,
              isAvailable: bookStatus === "대출가능",
              imageUrl: null,
            });
          } else if (params.bookStatus === bookStatus) {
            listData.push({
              title,
              detailUrl: parsedDetaliUrl,
              author,
              isAvailable: bookStatus === "대출가능",
              imageUrl: null,
            });
          }
        });

        return {
          BookList: listData,
          TotalCount: totalCount,
          TotalPage: Math.ceil(totalCount / listItemCount),
          Page: Number(currentPageMatch) || 1,
        };
      });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
