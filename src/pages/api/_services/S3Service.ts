import { PresignedPost, createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import Env from "../_utils/Env";

export default class S3Service {
  private static region: string = Env.get<string>("AMAZON_AWS_DEFAULT_REGION");
  private static bucket: string = Env.get<string>("AWS_BUCKET");

  public static getS3Instance(): S3Client {
    return new S3Client({
      apiVersion: "2006-03-01",
      region: S3Service.region,
    });
  }

  public static async createPresignedPost(data: {
    key: string;
    "Content-Type": string;
  }): Promise<PresignedPost> {
    const { key, ...fields } = data;
    return await createPresignedPost(S3Service.getS3Instance(), {
      Bucket: S3Service.bucket,
      Key: key,
      Conditions: [["content-length-range", 0, 1048576]],
      Fields: fields,
      Expires: 600,
    });
  }
}
