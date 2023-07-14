import { randomUUID } from "crypto";
import S3Service from "../_services/S3Service";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../_utils/HttpMethod";
import { AuthMiddleware } from "../_middleware/authMiddleware";
import { PresignedPost } from "@aws-sdk/s3-presigned-post";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method != HttpMethod.GET)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const { fileType } = req.query;

  const post: PresignedPost = await S3Service.createPresignedPost({
    key: `images/${randomUUID()}`,
    "Content-Type": fileType as string,
  });

  return res.status(200).json(post);
}

export default AuthMiddleware(handler);
