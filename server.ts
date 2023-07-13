import { NextConfig } from "next";
import NextServer from "next/dist/server/next-server";
import serverless from "serverless-http";
// @ts-ignore
import { config } from "./.next/required-server-files.json";

const nextServer = new NextServer({
  hostname: "localhost",
  port: 3000,
  dir: __dirname,
  dev: false,
  conf: {
    ...(config as NextConfig),
  },
});

export const handler = serverless(nextServer.getRequestHandler(), {
  binary: ["*/*"],
});

export function queueWorker(event: any, _: any, callback: any): any {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "SQS event processed.",
      input: event,
    }),
  };

  for (const message of event.Records) {
    const bodyData = JSON.parse(message.body);

    console.log("event info: ", JSON.stringify(bodyData));

    // Handle data here
  }

  callback(null, response);
}
