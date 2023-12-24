import dbConnect from "@app/lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User/User";
import { issueJwtAccessToken } from "@app/lib/jwtAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  await dbConnect("user");

  switch (method) {
    case "POST": {
      try {
        const user = await User.findOne({ oAuthId: req.body.id });
        const tokens = issueJwtAccessToken({ id: req.body.id });

        if (!tokens) throw new Error();

        res.setHeader(
          "Set-Cookie",
          `accessToken=${tokens.accessToken}; Path=/; HttpOnly`
        );

        return res.status(200).json({ data: { ...user, ...tokens } });
      } catch {
        res.status(400).json({
          message: "unexpected error",
        });
      }
    }
  }
}
