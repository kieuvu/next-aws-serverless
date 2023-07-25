import { randomUUID } from "crypto";
import S3Service from "../_services/S3Service";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../_utils/HttpMethod";
import { AuthMiddleware } from "../_middleware/authMiddleware";
import { PresignedPost } from "@aws-sdk/s3-presigned-post";
import Env from "../_utils/Env";

type CreateS3PresignedRequest = {
  fileType: string;
};

type CreateS3PresignedResponse =
  | {
      status?: boolean;
      message?: string;
    }
  | (PresignedPost & {
      filename: string;
      bucket: string;
    });

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateS3PresignedResponse>,
): Promise<void> {
  if (req.method != HttpMethod.GET)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const { fileType } = <CreateS3PresignedRequest>req.query;

  const filename: string = randomUUID();
  const bucket: string = Env.get<string>("AWS_BUCKET");

  const post: PresignedPost = await S3Service.createPresignedPost({
    key: `images/${filename}`,
    "Content-Type": fileType,
  });

  return res.status(200).json({
    ...post,
    filename,
    bucket,
  });
}

export default AuthMiddleware(handler);
