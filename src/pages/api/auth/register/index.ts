import { NextApiRequest, NextApiResponse } from "next";
import CognitoService from "../../_services/CognitoService";
import { HttpMethod } from "../../_utils/HttpMethod";

type RegisterRequest = {
  email: string;
  password: string;
};

type RegisterResponse = {
  status: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
): Promise<void> {
  if (req.method != HttpMethod.POST)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const { email, password } = <RegisterRequest>JSON.parse(req.body);

  const result: boolean = await CognitoService.createUser(email, password);

  if (!result) {
    return res.status(400).json({
      status: false,
      message: "Bad Request",
    });
  }

  return res.status(200).json({
    status: true,
  });
}
