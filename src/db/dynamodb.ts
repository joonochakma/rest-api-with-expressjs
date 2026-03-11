import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { config } from '../config';

const client = new DynamoDBClient({
  region: config.aws.region,
  ...(config.aws.dynamodbEndpoint && { endpoint: config.aws.dynamodbEndpoint }),
});

export const dynamoDb = DynamoDBDocumentClient.from(client);
