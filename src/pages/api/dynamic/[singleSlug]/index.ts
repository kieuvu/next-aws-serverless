import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../../_utils/HttpMethod";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method != HttpMethod.GET)
    return res.status(405).json({ status: false, message: "Method Not Allowed" });

  return res.status(200).json({
    message: req.query.singleSlug,
  });
}
