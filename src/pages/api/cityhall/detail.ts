import type { NextApiRequest, NextApiResponse } from "next";

import { CityHallBookDetailType } from "@app/types/CityHallBookType";
import * as cheerio from "cheerio";
import axios from "axios";
type ResponseData = { bookDetail: CityHallBookDetailType } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const params = req.body;

    const result = await axios
      .get(`https://lib.seoul.go.kr/search/detail/${params.book_no}`)
      .then(async ({ data }) => {
        const html = data;
        const $ = cheerio.load(html);

        const bookDetailPart = $(".detail-book");

        const title = bookDetailPart.find(".profileHeader > h3").text().trim();
        const author = bookDetailPart.find(".profileHeader > p").text().trim();
        const isbn = $('th:contains("ISBN")').next().text().trim();
        const publisher = $('th:contains("발행사항")').next().text().trim();
        const status = $(".footable-detail-show > p").text().trim();
        const imageUrl = $("#divCoverImage > img").attr("src");

        console.log(imageUrl);
        return {
          title,
          author,
          publisher,
          imageUrl: "",
          //   imageUrl: `https://img.libbook.co.kr/V2/BookImgK7/${isbn}.gif`,
          isAvailable: status !== "대출중",
          description: "",
        };
      });

    res.status(200).json({ bookDetail: result });
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
