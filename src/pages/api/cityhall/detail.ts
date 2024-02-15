import type { NextApiRequest, NextApiResponse } from "next";

import { CityHallBookDetailType } from "@app/types/CityHallBookType";

const puppeteer = require("puppeteer");

type ResponseData = { bookDetail: CityHallBookDetailType } | { error: string };

const parseBookDeatil = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.evaluate(() => {
    const imageUrl = (
      document.querySelector("span#divCoverImage img") as HTMLImageElement
    )?.src;

    const title = document
      .querySelector(".profileHeader > h3")
      ?.textContent?.trim();
    const author = document
      .querySelector(".profileHeader > p")
      ?.textContent?.trim();

    let isbn, publisher;

    document.querySelectorAll("th").forEach((th) => {
      if (th.textContent?.includes("ISBN")) {
        isbn = th.nextElementSibling?.textContent?.trim();
      }
      if (th.textContent?.includes("발행사항")) {
        publisher = th.nextElementSibling?.textContent?.trim();
      }
    });

    const status = document
      .querySelector(".footable-detail-show > p")
      ?.textContent?.trim();

    return { imageUrl, title, author, id: isbn, publisher, status };
  });

  await browser.close();

  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const params = req.body;

    const result = await parseBookDeatil(
      `https://lib.seoul.go.kr/search/detail/${params.book_no}`
    );

    res.status(200).json({ bookDetail: result });
  } catch (err) {
    res.status(500).json({ error: "API 에러 발생" });
  }
}
