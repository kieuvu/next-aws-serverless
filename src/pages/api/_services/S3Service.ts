import { PresignedPost, createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import {
  AwsClientConfig as configuration,
  AwsConfig,
} from "../_configs/AwsConfig";

export default class S3Service {
  private static bucket: string = AwsConfig.bucket;
  private static clientInstance: S3Client = new S3Client({
    ...configuration,
    forcePathStyle: true,
    credentials: {
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER",
    },
    endpoint: `http://localhost:8001`,
  });

  public static async createPresignedPost(data: {
    key: string;
    "Content-Type": string;
  }): Promise<PresignedPost> {
    const { key, ...fields } = data;
    return await createPresignedPost(S3Service.clientInstance, {
      Bucket: S3Service.bucket,
      Key: key,
      Conditions: [["content-length-range", 0, 1048576]],
      Fields: fields,
      Expires: 600,
    });
  }
}
