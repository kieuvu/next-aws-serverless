import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandOutput,
} from "@aws-sdk/client-sqs";
import { AwsClientConfig, AwsConfig } from "../_configs/AwsConfig";

export default class SQSService {
  private static queueUrl: string = AwsConfig.queueUrl;

  public static getSQSInstance(): SQSClient {
    return new SQSClient(AwsClientConfig);
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
