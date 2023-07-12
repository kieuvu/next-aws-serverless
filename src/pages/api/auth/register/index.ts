import { NextApiRequest, NextApiResponse } from "next";
import CognitoService from "../../_services/CognitoService";
import { HttpMethod } from "../../_utils/HttpMethod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != HttpMethod.POST) res.status(405);

  const { email, password } = JSON.parse(req.body);

  const result = await CognitoService.register(email, password);

  if (!result) {
    res.status(400).json({
      status: false,
      message: "Bad Request",
    });
  }

  res.status(200).json({
    status: true,
  });
}