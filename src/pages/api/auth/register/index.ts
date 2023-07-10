import { NextApiRequest, NextApiResponse } from "next";
import CognitoService from "../../_services/CognitoService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") res.status(405).json({ message: "Only POST requests allowed" });

  const { email, password } = JSON.parse(req.body);

  console.log(email, password);

  const result = await CognitoService.register(email, password);

  if (!result) {
    res.status(400).json({
      message: "Bad Gateway",
    });
  }

  res.status(200).json({
    status: true,
  });
}
