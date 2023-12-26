import dbConnect from "@app/lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User/User";
import Bookmark from "../../../models/Book/Bookmark";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  await dbConnect("user");
  await dbConnect("bookmark");

  switch (method) {
    case "GET": {
      try {
        const user = await User.findOne({ oAuthId: req.query.id });
        const bookmarkList = await Bookmark.find({
          userId: user.id,
        });

        if (!user) {
          return res.status(404).json({ message: "user not found" });
        } else {
          return res
            .status(200)
            .json({ data: { user, bookmark: bookmarkList } });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: "unexpected error",
        });
      }
    }
  }
}

export default handler;
