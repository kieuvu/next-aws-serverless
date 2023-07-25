import { NextApiRequest, NextApiResponse } from "next";
import CognitoService from "../_services/CognitoService";
import UnauthorizedException from "../_exceptions/UnauthorizedException";

export function AuthMiddleware(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: any,
  ) => Promise<any>,
): (req: NextApiRequest, res: NextApiResponse) => Promise<any> {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    try {
      const authorizationToken: string | undefined = req.headers?.authorization;
      if (!authorizationToken) throw new UnauthorizedException();

      const token: string = authorizationToken.split(" ")[1];
      const user: any = await CognitoService.getUser(token);

      console.log(user);

      if (!user) throw new UnauthorizedException();
      return handler(req, res, user);
    } catch (error) {
      console.error("Api Error", error);
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
}
