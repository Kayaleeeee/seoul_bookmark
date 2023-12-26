import dbConnect from "@app/lib/mongodb";
import { withAuthHandler } from "@app/utils/authorization";
import { NextApiRequest, NextApiResponse } from "next";
import Bookmark from "../../../../models/Book/Bookmark";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  userId: string
) => {
  const { method } = req;

  await dbConnect("bookmark");

  switch (method) {
    case "GET": {
      try {
        const bookmarkList = await Bookmark.find({
          userId,
        });

        return res.status(200).json({
          bookmarkList,
        });
      } catch (e) {
        return res.status(400).json({
          message: "Failed to get bookmark list",
        });
      }
    }
    case "POST": {
      try {
        const savedBookmark = await Bookmark.findOne({
          userId,
          id: req.body.book.id,
        });

        if (!!savedBookmark) throw new Error("Already saved on Bookmark");

        await Bookmark.create({
          ...req.body.book,
          userId,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          message: "Failed to save bookmark",
        });
      }
    }

    default:
      return res.status(200).json({
        message: "성공",
      });
  }
};

export default withAuthHandler(handler);
