import { createResponse } from "../../utils/sendResponse";

export const handler = async (_: any) => {
  const logMessage: string = `Log: ${new Date().getTime()}`;

  console.log("🚀 ~ file: log.ts:11 ~ handler ~ logMessage:", logMessage);

  return createResponse(200, {
    status: true,
    logMessage,
  });
};
