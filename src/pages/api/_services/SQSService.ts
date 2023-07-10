import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export default class SQSService {
  public static getSQSInstance() {
    return new SQSClient({
      credentials: {
        accessKeyId: process.env.AMAZON_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AMAZON_AWS_ACCESS_KEY_SECRET as string,
      },
      region: process.env.AMAZON_AWS_DEFAULT_REGION as string,
    });
  }

  public static async sendQueue(body: any) {
    const params = {
      MessageBody: JSON.stringify(body),
      QueueUrl: process.env.AWS_SQS_URL as string,
    };

    try {
      const data = await SQSService.getSQSInstance().send(new SendMessageCommand(params));
      console.log("data sent info:", data);
      return true;
    } catch (err) {
      return false;
    }
  }
}
