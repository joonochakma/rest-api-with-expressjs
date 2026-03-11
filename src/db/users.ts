import { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { dynamoDb } from './dynamodb';
import { config } from '../config';

const TABLE_NAME = config.aws.usersTableName;

export interface User {
  id: string;
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken?: string;
  };
}

export interface UserUpdate {
  username?: string;
  authentication?: {
    sessionToken?: string;
  };
}

export const getUsers = async (): Promise<User[]> => {
  const result = await dynamoDb.send(new ScanCommand({
    TableName: TABLE_NAME,
    ProjectionExpression: 'id, username, email',
  }));
  return result.Items as User[];
};

export const getUserByEmail = async (email: string) => {
  const result = await dynamoDb.send(new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  }));
  return result.Items?.[0] as User | undefined;
};

export const getUserBySessionToken = async (sessionToken: string) => {
  const result = await dynamoDb.send(new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: 'SessionTokenIndex',
    KeyConditionExpression: 'sessionToken = :sessionToken',
    ExpressionAttributeValues: {
      ':sessionToken': sessionToken,
    },
  }));
  return result.Items?.[0] as User | undefined;
};

export const getUserById = async (id: string) => {
  const result = await dynamoDb.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: { id },
  }));
  return result.Item as User | undefined;
};

export const createUser = async (values: Partial<User>): Promise<User> => {
  const user: User = {
    id: uuidv4(),
    username: values.username!,
    email: values.email!,
    authentication: values.authentication!,
  };
  
  await dynamoDb.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: user,
  }));
  
  return user;
};

export const deleteUserById = async (id: string) => {
  await dynamoDb.send(new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id },
  }));
};

export const updateUserById = async (id: string, values: UserUpdate) => {
  const updateExpressions: string[] = [];
  const expressionAttributeValues: Record<string, any> = {};
  const expressionAttributeNames: Record<string, string> = {};

  if (values.username) {
    updateExpressions.push('#username = :username');
    expressionAttributeValues[':username'] = values.username;
    expressionAttributeNames['#username'] = 'username';
  }

  if (values.authentication?.sessionToken !== undefined) {
    updateExpressions.push('#auth.#sessionToken = :sessionToken');
    expressionAttributeValues[':sessionToken'] = values.authentication.sessionToken;
    expressionAttributeNames['#auth'] = 'authentication';
    expressionAttributeNames['#sessionToken'] = 'sessionToken';
  }

  if (updateExpressions.length === 0) return;

  await dynamoDb.send(new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
  }));
};
