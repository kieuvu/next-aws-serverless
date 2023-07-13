import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import {
  AdminCreateUserResponse,
  AdminInitiateAuthResponse,
  AuthenticationResultType,
  GetUserResponse,
} from "aws-sdk/clients/cognitoidentityserviceprovider";

export default class CognitoService {
  private static userPool: string = process.env.USER_POOL as string;
  private static userPoolClient: string = process.env.USER_POOL_CLIENT as string;
  private static region: string = process.env.AMAZON_AWS_DEFAULT_REGION as string;

  private static getCognitoInstance(): CognitoIdentityServiceProvider {
    return new AWS.CognitoIdentityServiceProvider({
      region: CognitoService.region,
    });
  }

  public static async getUser(token: string): Promise<GetUserResponse | null> {
    try {
      const user: GetUserResponse = await CognitoService.getCognitoInstance()
        .getUser({ AccessToken: token })
        .promise();
      return user ?? null;
    } catch (_) {
      return null;
    }
  }

  public static async refreshToken(
    refreshToken: string,
  ): Promise<AuthenticationResultType | null | undefined> {
    const cognito: CognitoIdentityServiceProvider = CognitoService.getCognitoInstance();

    try {
      const response: AdminInitiateAuthResponse = await cognito
        .adminInitiateAuth({
          AuthFlow: "REFRESH_TOKEN",
          ClientId: CognitoService.userPoolClient,
          UserPoolId: CognitoService.userPool,
          AuthParameters: {
            REFRESH_TOKEN: refreshToken,
          },
        })
        .promise();
      return response.AuthenticationResult;
    } catch (_) {
      return null;
    }
  }

  public static async register(email: string, password: string): Promise<boolean> {
    try {
      const cognito: CognitoIdentityServiceProvider = CognitoService.getCognitoInstance();

      const result: AdminCreateUserResponse = await cognito
        .adminCreateUser({
          UserPoolId: CognitoService.userPool,
          Username: email,
          UserAttributes: [
            {
              Name: "email",
              Value: email,
            },
            {
              Name: "email_verified",
              Value: "true",
            },
          ],
          MessageAction: "SUPPRESS",
        })
        .promise();

      if (result.User) {
        await cognito
          .adminSetUserPassword({
            Password: password,
            UserPoolId: CognitoService.userPool,
            Username: email,
            Permanent: true,
          })
          .promise();
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public static async login(
    email: string,
    password: string,
  ): Promise<AuthenticationResultType | boolean | undefined> {
    try {
      const cognito: CognitoIdentityServiceProvider = CognitoService.getCognitoInstance();

      const response: AdminInitiateAuthResponse = await cognito
        .adminInitiateAuth({
          AuthFlow: "ADMIN_NO_SRP_AUTH",
          UserPoolId: CognitoService.userPool,
          ClientId: CognitoService.userPoolClient,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        })
        .promise();

      delete response.AuthenticationResult?.IdToken; // if is not admin (prevent to access user details)

      return response.AuthenticationResult;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
