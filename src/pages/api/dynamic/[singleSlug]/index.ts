import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../../_utils/HttpMethod";

type TestSingleSlugRequest = {
  singleSlug: string;
};

type TestSingleSlugResponse = {
  message: string;
  status?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestSingleSlugResponse>,
): Promise<void> {
  if (req.method != HttpMethod.GET)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const { singleSlug } = <TestSingleSlugRequest>req.query;

  return res.status(200).json({
    message: singleSlug,
  });
}
