import { NextApiRequest, NextApiResponse } from "next";
import CognitoService from "../../_services/CognitoService";
import { HttpMethod } from "../../_utils/HttpMethod";
import { AuthenticationResultType } from "aws-sdk/clients/cognitoidentityserviceprovider";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: boolean;
  credentials?: {
    token: boolean | AuthenticationResultType | undefined;
  };
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
): Promise<void> {
  if (req.method != HttpMethod.POST)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const { email, password } = <LoginRequest>JSON.parse(req.body);

  const credentials: boolean | AuthenticationResultType | undefined =
    await CognitoService.login(email, password);

  if (!credentials) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }

  return res.status(200).json({
    status: true,
    credentials: {
      token: credentials,
    },
  });
}
