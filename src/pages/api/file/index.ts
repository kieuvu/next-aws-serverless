import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const s3 = new S3({
    apiVersion: "2006-03-01",
  });

  const { fileName, fileType } = req.query;

  const post = s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET,
    Fields: {
      key: `images/${randomUUID()}`,
      "Content-Type": fileType,
    },
    Expires: 300, // seconds
    Conditions: [["content-length-range", 0, 1048576]],
  });

  res.status(200).json(post);
}
