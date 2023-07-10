import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import S3Service from "../_services/S3Service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileType } = req.query;

  const post = S3Service.createPresignedPost({
    key: `images/${randomUUID()}`,
    "Content-Type": fileType,
  });

  res.status(200).json(post);
}
