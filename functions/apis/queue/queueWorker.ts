import { createResponse } from "../../utils/sendResponse";

export const handler = async (event: any, _: any, callback: any) => {
  for (const message of event.Records) {
    const bodyData = JSON.parse(message.body);

    console.log("event info: ", JSON.stringify(bodyData));

    // Handle data here
  }

  return createResponse(200, {
    message: "SQS event processed.",
  });
};
