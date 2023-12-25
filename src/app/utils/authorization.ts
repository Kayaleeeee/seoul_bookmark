import { verifyJwt } from "@app/lib/jwtAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfoByToken } from "./cookieUtils";

export const isAuthenticated = async (accessToken: string) => {
  try {
    const tokenData = await verifyJwt(accessToken);

    if (!tokenData || !tokenData.exp) {
      throw new Error("유효하지 않은 토큰입니다.");
    }

    // Check if the token is expired
    if (Date.now() >= tokenData.exp * 1000) {
      throw new Error("토큰이 만료되었습니다.");
    }

    return true;
  } catch (error) {
    // Handle JWT verification error
    console.error("JWT verification error:", error);
    throw new Error("유효하지 않은 토큰입니다.");
  }
};

export const withAuthHandler =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      userId: string
    ) => Promise<void>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const accessTokenCookie = await req.cookies["accessToken"];

    try {
      if (!accessTokenCookie) {
        return res.status(401).json({
          message: "허용되지 않은 접근입니다.",
        });
      }

      if (!isAuthenticated(accessTokenCookie)) {
        res.setHeader("Set-Cookie", `accessToken=; Path=/; HttpOnly`);
        return res.status(403).json({
          message: "유효하지 않은 토큰입니다.",
        });
      }

      const { data } = await getUserInfoByToken(accessTokenCookie);

      return handler(req, res, data.user._id);
    } catch (e) {
      res.setHeader("Set-Cookie", `accessToken=; Path=/; HttpOnly`);
      return res.status(500).json({
        message: "서버 오류",
      });
    }
  };
