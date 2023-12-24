import dbConnect from "@app/lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";
import Bookmark from "../../../../models/Book/Bookmark";

import { withAuthHandler } from "@app/utils/authorization";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  userId: string
) {
  const { method } = req;

  await dbConnect("bookmark");

  switch (method) {
    case "GET": {
      try {
        const savedBookmark = await Bookmark.findOne({
          userId,
          id: req.query.id,
        });

        return res.status(200).json({
          bookmark: savedBookmark,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          message: "서버 오류",
        });
      }
    }

    case "DELETE": {
      try {
        const savedBookmark = await Bookmark.findOne({
          userId,
          id: req.query.id,
        });

        if (!savedBookmark) throw new Error("No bookmark found");

        await Bookmark.deleteOne({
          userId: savedBookmark.userId,
          id: savedBookmark.id,
        });

        return res.status(201).json({
          message: "success",
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          message: "Failed to delete bookmark",
        });
      }
    }
  }
}

export default withAuthHandler(handler);
