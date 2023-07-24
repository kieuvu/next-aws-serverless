import { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../_middleware/authMiddleware";
import Env from "../../_utils/Env";
import { HttpMethod } from "../../_utils/HttpMethod";
import DynamodbService from "../../_services/DynamodbService";
import { ScanInput, ScanOutput } from "@aws-sdk/client-dynamodb";

type GetDynamodbTableRequest = {};

type GetDynamodbTableResponse = {
  status: boolean;
  data?: {
    records: ScanOutput;
    tableName: string;
  };
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetDynamodbTableResponse>,
): Promise<void> {
  if (req.method != HttpMethod.GET)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const tableName: string = Env.get<string>("DYNAMODB_TABLE_NAME");

  const input: ScanInput = {
    TableName: tableName,
  };

  const records: ScanOutput = await DynamodbService.scan(input);

  return res.status(200).json({
    status: true,
    data: {
      tableName,
      records,
    },
  });
}

export default AuthMiddleware(handler);
