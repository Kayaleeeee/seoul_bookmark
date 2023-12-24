import { withAuthHandler } from "@app/utils/authorization";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        return res.status(200).json({
          isLogined: true,
        });
      } catch (e) {
        return res.status(500).json({
          isLogined: false,
        });
      }
    }
  }
};

export default withAuthHandler(handler);
