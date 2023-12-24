import dbConnect from "@app/lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User/User";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  await dbConnect("user");

  switch (method) {
    case "GET": {
      try {
        const user = await User.findOne({ oAuthId: req.query.id });

        if (!user) {
          return res.status(404).json({ message: "user not found" });
        } else {
          return res.status(200).json({ data: user });
        }
      } catch (e) {
        res.status(500).json({
          message: "unexpected error",
        });
      }
    }
  }
}

export default handler;
