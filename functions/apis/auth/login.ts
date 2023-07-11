import CognitoService from "../../services/CognitoService";
import { createResponse } from "../../utils/sendResponse";

export const handler = async (event: any) => {
  const { email, password } = JSON.parse(event.body);

  const credentials = await CognitoService.login(email, password);

  console.log("credentials", credentials);

  if (!credentials) {
    return createResponse(401, {
      status: false,
      message: "Unauthorized",
    });
  }

  return createResponse(200, {
    status: true,
    credentials,
  });
};
