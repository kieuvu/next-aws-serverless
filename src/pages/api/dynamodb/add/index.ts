import { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../_middleware/authMiddleware";
import Env from "../../_utils/Env";
import { HttpMethod } from "../../_utils/HttpMethod";
import DynamodbService from "../../_services/DynamodbService";
import { PutItemInput } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

type AddDynamodbTableRequest = {
  name: string;
};

type AddDynamodbTableResponse = {
  status: boolean;
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddDynamodbTableResponse>,
): Promise<void> {
  if (req.method != HttpMethod.POST)
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });

  const { name } = <AddDynamodbTableRequest>JSON.parse(req.body);

  const tableName: string = Env.get<string>("DYNAMODB_TABLE_NAME");

  const input: PutItemInput = {
    TableName: tableName,
    Item: {
      id: { S: randomUUID() },
      text: { S: name },
    },
  };

  try {
    await DynamodbService.putItem(input);

    return res.status(200).json({
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
    });
  }
}

export default AuthMiddleware(handler);
