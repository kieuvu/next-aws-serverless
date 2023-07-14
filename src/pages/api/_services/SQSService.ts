import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandOutput,
} from "@aws-sdk/client-sqs";
import Env from "../_utils/Env";

export default class SQSService {
  private static queueUrl: string = Env.get<string>("AWS_SQS_URL");
  private static region: string = Env.get<string>("AMAZON_AWS_DEFAULT_REGION");

  public static getSQSInstance(): SQSClient {
    return new SQSClient({
      region: SQSService.region,
    });
  }

  public static async sendQueue(body: any): Promise<boolean> {
    try {
      const data: SendMessageCommandOutput =
        await SQSService.getSQSInstance().send(
          new SendMessageCommand({
            MessageBody: JSON.stringify(body),
            QueueUrl: SQSService.queueUrl,
          }),
        );
      console.log("data sent info:", data);
      return true;
    } catch (err) {
      return false;
    }
  }
}
