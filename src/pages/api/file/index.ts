import { NextApiRequest, NextApiResponse } from "next";
import { Image } from "../_models";
import { AuthMiddleware } from "../_middleware/authMiddleware";
import { HttpMethod } from "../_utils/HttpMethod";
import Env from "../_utils/Env";

type UploadRequest = {
  bucket: string;
  filename: string;
};

type UploadResponse = {
  status: boolean;
  message?: string;
  data?: Image[];
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>,
  user: any,
): Promise<void> {
  console.log({
    host: Env.get<string>("DB_URL"),
    database: Env.get<string>("DB_Name"),
    user: Env.get<string>("DB_UserName"),
    password: Env.get<string>("DB_Password"),
  });
  switch (req.method) {
    case HttpMethod.POST:
      const { bucket, filename } = <UploadRequest>JSON.parse(req.body);

      const image: Image = new Image();

      image.name = filename;
      image.author = user.Username;
      image.bucket = bucket;

      try {
        image.save();
        return res.status(200).json({
          status: true,
        });
      } catch (error) {
        return res.status(401).json({
          status: false,
        });
      }
    case HttpMethod.GET:
      try {
        const images: Image[] = await Image.findAll();

        console.log(images);

        return res.status(200).json({
          status: true,
          data: images,
        });
      } catch (error) {
        return res.status(401).json({
          status: false,
        });
      }
    default:
      return res
        .status(405)
        .json({ status: false, message: "Method Not Allowed" });
  }
}

export default AuthMiddleware(handler);
