function queueReceiver(event: any, context: any, callback: any) {
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

export { queueReceiver };
