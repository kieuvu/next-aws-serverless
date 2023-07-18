import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../_utils/HttpMethod";
import { AuthMiddleware } from "../_middleware/authMiddleware";

type LogRequest = {};

type LogResponse = {
  status: boolean;
  logMessage?: string;
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogResponse>,
): Promise<any> {
  if (req.method != HttpMethod.GET)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const logMessage: string = `Log: ${new Date().getTime()}`;

  console.log("🚀 ~ file: log.ts:11 ~ handler ~ logMessage:", logMessage);

  return res.status(200).json({
    status: true,
    logMessage,
  });
}

export default AuthMiddleware(handler);
