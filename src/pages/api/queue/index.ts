import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: process.env.AMAZON_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AMAZON_AWS_ACCESS_KEY_SECRET as string,
  },
  region: process.env.AMAZON_AWS_DEFAULT_REGION as string,
});

export default async function handler(req: any, res: any) {
  const params = {
    MessageBody: JSON.stringify({
      from: "Vukm",
      data: {
        message: "Test queue job dispatch",
        time: new Date(),
      },
    }),
    QueueUrl: process.env.AWS_SQS_URL as string,
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("data sent info:", data);
  } catch (err) {
  } finally {
    res.status(200).json({
      status: true,
    });
  }
}
