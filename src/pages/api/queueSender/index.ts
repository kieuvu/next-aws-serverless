import { NextApiRequest, NextApiResponse } from "next";
import SQSService from "../_services/SQSService";
import { HttpMethod } from "../_utils/HttpMethod";
import { AuthMiddleware } from "../_middleware/authMiddleware";

type QueueSenderRequest = {
  message: string;
};

type QueueSenderResponse = {
  status: boolean;
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QueueSenderResponse>,
): Promise<void> {
  if (req.method != HttpMethod.POST)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  await SQSService.sendQueue({
    from: "Vukm",
    data: {
      message: "Test queue job dispatch",
      time: new Date(),
    },
  });

  return res.status(200).json({
    status: true,
  });
}

export default AuthMiddleware(handler);
