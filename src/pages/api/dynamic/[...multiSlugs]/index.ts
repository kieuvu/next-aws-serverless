import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../../_utils/HttpMethod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != HttpMethod.GET) res.status(405);

  res.status(200).json({
    message: req.query.multiSlugs,
  });
}
