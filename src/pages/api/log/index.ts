import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  logMessage: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const logMessage: string = `Log: ${new Date().getTime()}`;

  console.log("🚀 ~ file: log.ts:11 ~ handler ~ logMessage:", logMessage);

  res.status(200).json({
    status: true,
    logMessage,
  });
}
