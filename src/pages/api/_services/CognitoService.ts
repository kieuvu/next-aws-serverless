import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";

export default class AuthService {
  private static getCognitoInstance(): CognitoIdentityServiceProvider {
    return new AWS.CognitoIdentityServiceProvider({
      region: process.env.AMAZON_AWS_DEFAULT_REGION as string,
    });
  }

  public static async register(email: string, password: string): Promise<any> {
    try {
      const cognito: CognitoIdentityServiceProvider = AuthService.getCognitoInstance();
      const userPool: string = process.env.USER_POOL as string;

      const result = await cognito
        .adminCreateUser({
          UserPoolId: userPool,
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
            UserPoolId: userPool,
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

  public static async login(email: string, password: string): Promise<any> {
    try {
      const cognito: CognitoIdentityServiceProvider = AuthService.getCognitoInstance();
      const userPool: string = process.env.USER_POOL as string;
      const userPoolClient: string = process.env.USER_POOL_CLIENT as string;

      const response = await cognito
        .adminInitiateAuth({
          AuthFlow: "ADMIN_NO_SRP_AUTH",
          UserPoolId: userPool,
          ClientId: userPoolClient,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        })
        .promise();

      delete response.AuthenticationResult?.IdToken; // if is not admin (prevent to access user details)

      return {
        token: response.AuthenticationResult,
      };
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
