import { AWSError } from "aws-sdk";
import {
  AdminCreateUserCommandOutput,
  AdminInitiateAuthCommandOutput,
  AuthenticationResultType,
  CognitoIdentityProvider,
  GetUserCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import {
  AwsClientConfig as configuration,
  AwsConfig,
} from "../_configs/AwsConfig";

export default class CognitoService {
  private static userPool: string = AwsConfig.userPool;
  private static userPoolClient: string = AwsConfig.userPoolClient;
  private static clientInstance: CognitoIdentityProvider =
    new CognitoIdentityProvider(configuration);

  public static async getUser(
    token: string,
  ): Promise<GetUserCommandOutput | null> {
    try {
      const user: GetUserCommandOutput =
        await CognitoService.clientInstance.getUser({
          AccessToken: token,
        });
      return user ?? null;
    } catch (_) {
      return null;
    }
  }

  public static async refreshToken(
    refreshToken: string,
  ): Promise<AuthenticationResultType | null | undefined> {
    try {
      const response: AdminInitiateAuthCommandOutput =
        await CognitoService.clientInstance.adminInitiateAuth({
          AuthFlow: "REFRESH_TOKEN",
          ClientId: CognitoService.userPoolClient,
          UserPoolId: CognitoService.userPool,
          AuthParameters: {
            REFRESH_TOKEN: refreshToken,
          },
        });
      return response.AuthenticationResult;
    } catch (_) {
      return null;
    }
  }

  public static async createUser(
    email: string,
    password: string,
  ): Promise<boolean> {
    try {
      const result: AdminCreateUserCommandOutput =
        await CognitoService.clientInstance.adminCreateUser({
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
        });

      if (!result.User) throw Error();

      await CognitoService.clientInstance.adminSetUserPassword({
        Password: password,
        UserPoolId: CognitoService.userPool,
        Username: email,
        Permanent: true,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public static async authenticateUser(
    email: string,
    password: string,
  ): Promise<AuthenticationResultType | boolean | undefined> {
    try {
      const response: AdminInitiateAuthCommandOutput =
        await CognitoService.clientInstance.adminInitiateAuth({
          AuthFlow: "ADMIN_NO_SRP_AUTH",
          UserPoolId: CognitoService.userPool,
          ClientId: CognitoService.userPoolClient,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        });

      delete response.AuthenticationResult?.IdToken; // if is not admin (prevent to access user details)
      return response.AuthenticationResult;
    } catch (error) {
      const err: AWSError = <AWSError>error;
      switch (err.code) {
        case "NotAuthorizedException":
          console.error("Incorrect username or password.");
          break;
        case "UserNotFoundException":
          console.error("User does not exist in system.");
          break;
        case "InvalidParameterException":
          console.error(" Missing required parameter.");
          break;
        default:
          console.error("Internal Server Error", error);
          break;
      }
      return false;
    }
  }
}
