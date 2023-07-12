import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../_utils/HttpMethod";
import { AuthMiddleware } from "../_middleware/authMiddleware";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != HttpMethod.GET) res.status(405);

  const logMessage: string = `Log: ${new Date().getTime()}`;

  console.log("🚀 ~ file: log.ts:11 ~ handler ~ logMessage:", logMessage);

  return res.status(200).json({
    status: true,
    logMessage,
  });
}

export default AuthMiddleware(handler);
