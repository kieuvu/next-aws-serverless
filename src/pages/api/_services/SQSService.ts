import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export default class SQSService {
  private static queueUrl: string = process.env.AWS_SQS_URL as string;
  private static awsAccessKeyId: string = process.env.AMAZON_AWS_ACCESS_KEY_ID as string;
  private static awsSecretAccessKey: string = process.env.AMAZON_AWS_ACCESS_KEY_SECRET as string;
  private static region: string = process.env.AMAZON_AWS_DEFAULT_REGION as string;

  public static getSQSInstance() {
    return new SQSClient({
      credentials: {
        accessKeyId: SQSService.awsAccessKeyId,
        secretAccessKey: SQSService.awsSecretAccessKey,
      },
      region: SQSService.region,
    });
  }

  public static async sendQueue(body: any) {
    const params: { MessageBody: string; QueueUrl: string } = {
      MessageBody: JSON.stringify(body),
      QueueUrl: SQSService.queueUrl,
    };

    try {
      const data: any = await SQSService.getSQSInstance().send(new SendMessageCommand(params));
      console.log("data sent info:", data);
      return true;
    } catch (err) {
      return false;
    }
  }
}
