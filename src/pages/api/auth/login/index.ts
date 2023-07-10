import { NextApiRequest, NextApiResponse } from "next";
import CognitoService from "../../_services/CognitoService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") res.status(405).json({ message: "Only POST requests allowed" });

  const { email, password } = JSON.parse(req.body);

  console.log(email, password);
  const credential = await CognitoService.login(email, password);

  console.log("credential", credential);

  if (!credential) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }

  return res.status(200).json({
    credential: credential.token,
  });
}
