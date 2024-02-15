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

    let status;

    const rows: HTMLTableRowElement[] = Array.from(
      document.querySelectorAll("tr.footable-detail-show")
    );

    rows.forEach((row) => {
      if (row.innerText.includes("스마트도서관(시청역)")) {
        const indexOfTd = Array.from(row.children).findIndex((td) =>
          td.textContent?.includes("스마트도서관(시청역)")
        );
        status = row.children[indexOfTd + 1]?.textContent?.trim();
      }
    });

    return {
      imageUrl,
      title,
      author,
      id: isbn,
      publisher,
      isAvailable: status !== "대출중",
    };
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
