import { createResponse } from "../../utils/sendResponse";

export const handler = async (_: any) => {
  return createResponse(200, {
    message: "Have a nice day " + new Date().getTime(),
  });
};
