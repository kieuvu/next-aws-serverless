import { NextApiRequest, NextApiResponse } from "next";
import Env from "../../_utils/Env";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = <{ slug: string }>req.query;
  return res.json(Env.get<string>(slug));
}
