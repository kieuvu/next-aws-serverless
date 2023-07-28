import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
} from "@aws-sdk/client-sqs";
import {
  AwsClientConfig as configuration,
  AwsConfig,
} from "../_configs/AwsConfig";

export default class SQSService {
  private static queueUrl: string = AwsConfig.queueUrl;
  private static clientInstance: SQSClient = new SQSClient({
    ...configuration,
    endpoint: "http://localhost:4566",
  });

  public static async sendQueue(value: any): Promise<boolean> {
    try {
      const input: SendMessageCommandInput = {
        MessageBody: JSON.stringify(value),
        QueueUrl: "an-serverless-next-2-rds-dev-jobs",
      };
      const command: SendMessageCommand = new SendMessageCommand(input);

      const data: SendMessageCommandOutput =
        await SQSService.clientInstance.send(command);

      console.log("Queue sent", data);
      return true;
    } catch (err) {
      return false;
    }
  }
}
