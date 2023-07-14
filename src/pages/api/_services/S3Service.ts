import { PresignedPost, createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { AwsClientConfig, AwsConfig } from "../_configs/AwsConfig";

export default class S3Service {
  private static bucket: string = AwsConfig.bucket;

  public static getS3Instance(): S3Client {
    return new S3Client(AwsClientConfig);
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
