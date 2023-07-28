import {
  DeleteItemCommand,
  DeleteItemInput,
  DeleteItemOutput,
  DynamoDBClient,
  GetItemCommand,
  GetItemInput,
  GetItemOutput,
  ListTablesCommand,
  ListTablesCommandOutput,
  ListTablesInput,
  PutItemCommand,
  PutItemCommandOutput,
  PutItemInput,
  QueryCommand,
  QueryInput,
  QueryOutput,
  ScanCommand,
  ScanInput,
  ScanOutput,
} from "@aws-sdk/client-dynamodb";
import { AwsClientConfig as configuration } from "../_configs/AwsConfig";

export default class DynamodbService {
  private static clientInstance: DynamoDBClient = new DynamoDBClient({
    ...configuration,
    region: "localhost",
    endpoint: "http://0.0.0.0:8002",
    credentials: {
      accessKeyId: "MockAccessKeyId",
      secretAccessKey: "MockSecretAccessKey",
    },
  });

  static async getAllTables(
    inp?: ListTablesInput,
  ): Promise<ListTablesCommandOutput> {
    const input: ListTablesInput = inp ?? {};
    const command: ListTablesCommand = new ListTablesCommand(input);
    return await DynamodbService.clientInstance.send(command);
  }

  static async deleteItem(input: DeleteItemInput): Promise<DeleteItemOutput> {
    const command: DeleteItemCommand = new DeleteItemCommand(input);
    return await DynamodbService.clientInstance.send(command);
  }

  static async putItem(input: PutItemInput): Promise<PutItemCommandOutput> {
    const command: PutItemCommand = new PutItemCommand(input);
    return await DynamodbService.clientInstance.send(command);
  }

  static async getItem(input: GetItemInput): Promise<GetItemOutput> {
    const command: GetItemCommand = new GetItemCommand(input);
    return await DynamodbService.clientInstance.send(command);
  }

  static async queryDb(input: QueryInput): Promise<QueryOutput> {
    const command: QueryCommand = new QueryCommand(input);
    return await DynamodbService.clientInstance.send(command);
  }

  static async scan(input: ScanInput): Promise<ScanOutput> {
    const command: ScanCommand = new ScanCommand(input);
    return await DynamodbService.clientInstance.send(command);
  }
}
