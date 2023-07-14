import Env from "../_utils/Env";

const region: string = Env.get<string>("AMAZON_AWS_DEFAULT_REGION");
const bucket: string = Env.get<string>("AWS_BUCKET");
const userPool: string = Env.get<string>("USER_POOL");
const userPoolClient: string = Env.get<string>("USER_POOL_CLIENT");
const queueUrl: string = Env.get<string>("AWS_SQS_URL");
const accessKeyId: string = Env.get<string>("AMAZON_AWS_ACCESS_KEY_ID");
const secretAccessKey: string = Env.get<string>("AMAZON_AWS_ACCESS_KEY_SECRET");

export const AwsConfig: {
  region: string;
  bucket: string;
  userPool: string;
  userPoolClient: string;
  queueUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
} = {
  region,
  bucket,
  userPool,
  userPoolClient,
  queueUrl,
  accessKeyId,
  secretAccessKey,
};

export const AwsClientConfig: {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  region: string;
} = {
  credentials: {
    accessKeyId: AwsConfig.accessKeyId,
    secretAccessKey: AwsConfig.secretAccessKey,
  },
  region: AwsConfig.region,
};
