import { randomUUID } from "crypto";
import S3Service from "../_services/S3Service";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "../_utils/HttpMethod";
import { AuthMiddleware } from "../_middleware/authMiddleware";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != HttpMethod.GET) res.status(405);

  const { fileType } = req.query;

  const post = S3Service.createPresignedPost({
    key: `images/${randomUUID()}`,
    "Content-Type": fileType,
  });

  res.status(200).json(post);
}

export default AuthMiddleware(handler);
