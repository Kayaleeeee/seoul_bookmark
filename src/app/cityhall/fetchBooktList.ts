import axios from "axios";
import * as cheerio from "cheerio";

const mobileUserAgent =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1";

const desktopUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36";

export const fetchBooktList = async (params: {
  index: number;
  category_nickname_key?: string;
}) => {
  return axios
    .get(`https://lib.seoul.go.kr/smartLibrary`)
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
        const isAvailable = $(item).find("td.date").text();

        listData.push({
          title,
          detailUrl,
          author,
          isAvailable: isAvailable === "대출가능",
          imageUrl: null,
        });
      });

      return {
        BookList: listData,
        TotalCount: totalCount,
        TotalPage: Math.ceil(totalCount / listItemCount),
        Page: Number(currentPageMatch) || 1,
      };
    });
};
