import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    case "POST": {
      try {
        res.setHeader("Set-Cookie", `accessToken=; Path=/; HttpOnly`);
        return res.status(200).json({ message: "로그아웃 완료" });
      } catch {
        res.status(400).json({
          message: "unexpected error",
        });
      }
    }
  }
}
