export const config = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  cookieSecret: process.env.COOKIE_SECRET || 'dev-secret',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  isProduction: process.env.NODE_ENV === 'production',
  aws: {
    region: process.env.AWS_REGION || 'ap-southeast-4',
    dynamodbEndpoint: process.env.DYNAMODB_ENDPOINT,
    usersTableName: process.env.USERS_TABLE_NAME || 'rest-api-users',
  },
};
