import CognitoService from "../../services/CognitoService";
import { createResponse } from "../../utils/sendResponse";

export const handler = async (event: any) => {
  const { email, password } = JSON.parse(event.body);

  const result = await CognitoService.register(email, password);

  if (!result) {
    return createResponse(400, {
      status: false,
      message: "Bad Request",
    });
  }

  return createResponse(400, {
    status: true,
  });
};
