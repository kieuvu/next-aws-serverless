import SQSService from "../../services/SQSService";
import { createResponse } from "../../utils/sendResponse";

export const handler = async (_: any) => {
  await SQSService.sendQueue({
    from: "Vukm",
    data: {
      message: "Test queue job dispatch",
      time: new Date(),
    },
  });

  return createResponse(200, {
    status: true,
  });
};
