import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../_utils/HttpMethod";
import { AuthMiddleware } from "../_middleware/authMiddleware";
import Env from "../_utils/Env";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method != HttpMethod.GET)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  return res.status(200).json({
    status: true,
    message:
      "Have a nice day " +
      new Date().getTime() +
      " - env: " +
      Env.get<string>("APP_ENV"),
  });
}

export default AuthMiddleware(handler);
