import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../../_utils/HttpMethod";

type TestMultiSlugRequest = {
  multiSlugs: string;
};

type TestMultiSlugResponse = {
  message: string;
  status?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestMultiSlugResponse>,
): Promise<void> {
  if (req.method != HttpMethod.GET)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const { multiSlugs } = <TestMultiSlugRequest>req.query;

  return res.status(200).json({
    message: multiSlugs,
  });
}
