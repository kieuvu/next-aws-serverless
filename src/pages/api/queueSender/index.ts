import { NextApiRequest, NextApiResponse } from "next";
import SQSService from "../_services/SQSService";
import { HttpMethod } from "../_utils/HttpMethod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != HttpMethod.POST) res.status(405);

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
