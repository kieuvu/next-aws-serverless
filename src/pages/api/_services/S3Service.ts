import S3, { PresignedPost } from "aws-sdk/clients/s3";

export default class S3Service {
  private static awsAccessKeyId: string = process.env
    .AMAZON_AWS_ACCESS_KEY_ID as string;
  private static awsSecretAccessKey: string = process.env
    .AMAZON_AWS_ACCESS_KEY_SECRET as string;
  private static bucket: string = process.env.AWS_BUCKET as string;

  public static getS3Instance(): S3 {
    return new S3({
      accessKeyId: S3Service.awsAccessKeyId,
      secretAccessKey: S3Service.awsSecretAccessKey,
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
