import { NextApiRequest, NextApiResponse } from "next";
import CognitoService from "../../_services/CognitoService";
import { HttpMethod } from "../../_utils/HttpMethod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != HttpMethod.POST) res.status(405);

  const { email, password } = JSON.parse(req.body);

  const credentials = await CognitoService.login(email, password);

  if (!credentials) {
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }

  res.status(200).json({
    status: true,
    credentials: {
      token: credentials,
    },
  });
}
