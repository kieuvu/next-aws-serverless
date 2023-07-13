export function handler(event: any, _: any, callback: any): any {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "SQS event processed.",
      input: event,
    }),
  };

  for (const message of event.Records) {
    const bodyData: any = JSON.parse(message.body);

    console.log("event info: ", JSON.stringify(bodyData));

    // Handle data here
  }

  callback(null, response);
}
