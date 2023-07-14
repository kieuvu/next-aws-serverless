import S3, { PresignedPost } from "aws-sdk/clients/s3";
import Env from "../_utils/Env";

export default class S3Service {
  private static kid: string = Env.get<string>("AMAZON_AWS_ACCESS_KEY_ID");
  private static sid: string = Env.get<string>("AMAZON_AWS_ACCESS_KEY_SECRET");
  private static bucket: string = Env.get<string>("AWS_BUCKET");

  public static getS3Instance(): S3 {
    return new S3({
      accessKeyId: S3Service.kid,
      secretAccessKey: S3Service.sid,
      apiVersion: "2006-03-01",
    });
  }

  public static createPresignedPost(fields: any): PresignedPost {
    return S3Service.getS3Instance().createPresignedPost({
      Bucket: S3Service.bucket,
      Fields: fields,
      Expires: 300,
      Conditions: [["content-length-range", 0, 1048576]],
    });
  }
}
