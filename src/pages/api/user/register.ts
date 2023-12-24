import dbConnect from "@app/lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User/User";
import { issueJwtAccessToken } from "@app/lib/jwtAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;
  await dbConnect("user");

  switch (method) {
    case "POST": {
      try {
        const tokens = issueJwtAccessToken({ id: req.query.id });

        const user = await User.create({
          name: body.name,
          profileImage: body.profileImage,
          oAuthId: body.kakaoId.toString(),
          oAuthType: "kakao",
          ...tokens,
        });

        if (!tokens) throw Error();

        res.setHeader(
          "Set-Cookie",
          `accessToken=${tokens.accessToken}; Path=/; HttpOnly `
        );
        return res.status(200).json({ data: user });
      } catch (e) {
        console.log(e);
        res.status(400).json({
          message: "unexpected error",
        });
      }
    }
  }
}
