import S3 from "aws-sdk/clients/s3";

export default class S3Service {
  public static getS3Instance() {
    return new S3({
      accessKeyId: process.env.AMAZON_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AMAZON_AWS_ACCESS_KEY_SECRET as string,
      apiVersion: "2006-03-01",
    });
  }

  public static createPresignedPost(fields: any) {
    return S3Service.getS3Instance().createPresignedPost({
      Bucket: process.env.AWS_BUCKET,
      Fields: fields,
      Expires: 300,
      Conditions: [["content-length-range", 0, 1048576]],
    });
  }
}
