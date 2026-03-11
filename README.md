# REST API with Express.js & DynamoDB

Production-ready REST API built with Express.js, TypeScript, and AWS DynamoDB featuring authentication, CORS, and Docker support.

## Features

- 🔐 **Authentication** - Session-based auth with secure cookies
- 🛡️ **Security** - httpOnly cookies, CORS, password hashing
- 🐳 **Docker** - Full containerization with DynamoDB Local
- 📝 **TypeScript** - Type-safe development
- 🗄️ **DynamoDB** - AWS NoSQL database
- ✅ **Production Ready** - Environment variables, error handling

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (protected)
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `PATCH /api/users/:id` - Update user (protected, owner only)
- `DELETE /api/users/:id` - Delete user (protected, owner only)

### Health
- `GET /health` - Health check endpoint

## Quick Start

### Option 1: Local Development with AWS DynamoDB

1. **Install dependencies**
```bash
npm install
```

2. **Configure AWS credentials**
```bash
aws configure
# Or set environment variables:
# export AWS_ACCESS_KEY_ID=your_access_key
# export AWS_SECRET_ACCESS_KEY=your_secret_key
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Create DynamoDB table**
```bash
npm run setup:dynamodb
```

5. **Run development server**
```bash
npm run dev
```

Server runs on `http://localhost:8080`

### Option 2: Docker with DynamoDB Local

1. **Start with docker-compose**
```bash
docker-compose up -d
```

This starts:
- API server on port 8080
- DynamoDB Local on port 8000

2. **Create table in DynamoDB Local**
```bash
DYNAMODB_ENDPOINT=http://localhost:8000 AWS_ACCESS_KEY_ID=dummy AWS_SECRET_ACCESS_KEY=dummy npm run setup:dynamodb
```

3. **Stop containers**
```bash
docker-compose down
```

4. **View logs**
```bash
docker-compose logs -f api
```

## Environment Variables

```env
PORT=8080
NODE_ENV=development
COOKIE_SECRET=your-secret-key-change-in-production
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# AWS Configuration
AWS_REGION=us-east-1
USERS_TABLE_NAME=rest-api-users

# For local DynamoDB (optional)
# DYNAMODB_ENDPOINT=http://localhost:8000
```

## DynamoDB Table Schema

**Table Name:** `rest-api-users`

**Primary Key:**
- `id` (String) - Partition key

**Global Secondary Indexes:**
- `EmailIndex` - Query by email
- `SessionTokenIndex` - Query by session token

**Attributes:**
- `id` - Unique user ID (UUID)
- `username` - User's display name
- `email` - User's email address
- `authentication.password` - Hashed password
- `authentication.salt` - Password salt
- `authentication.sessionToken` - Active session token

## Client-Side Integration

### JavaScript/TypeScript Example

```javascript
// Register
const register = async (email, password, username) => {
  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });
  return response.json();
};

// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    credentials: 'include', // Important for cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Get current user
const getCurrentUser = async () => {
  const response = await fetch('http://localhost:8080/api/auth/me', {
    credentials: 'include',
  });
  return response.json();
};

// Logout
const logout = async () => {
  const response = await fetch('http://localhost:8080/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
};
```

### React Example with Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// Login
const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

// Get users
const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};
```

## Project Structure

```
src/
├── config/          # Environment configuration
├── controllers/     # Request handlers
├── db/             # DynamoDB operations
│   ├── dynamodb.ts # DynamoDB client
│   └── users.ts    # User operations
├── helpers/        # Utility functions
├── middlewares/    # Express middlewares
├── router/         # Route definitions
└── index.ts        # App entry point
scripts/
└── create-table.ts # DynamoDB table setup
```

## Security Features

- Password hashing with salt
- httpOnly cookies (prevents XSS)
- Secure cookies in production (HTTPS only)
- SameSite cookie protection (CSRF)
- CORS with origin whitelist
- Session token authentication
- AWS IAM integration

## Production Deployment

### AWS Deployment

1. **Create DynamoDB table in AWS**
```bash
npm run setup:dynamodb
```

2. **Build application**
```bash
npm run build
```

3. **Deploy to EC2/ECS/Lambda**
- Set environment variables
- Configure IAM role with DynamoDB permissions
- Deploy built application

### Required IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:*:*:table/rest-api-users",
        "arn:aws:dynamodb:*:*:table/rest-api-users/index/*"
      ]
    }
  ]
}
```

### Environment Checklist
- [ ] Set strong `COOKIE_SECRET`
- [ ] Configure `ALLOWED_ORIGINS` for your frontend
- [ ] Set `NODE_ENV=production`
- [ ] Configure AWS credentials or IAM role
- [ ] Create DynamoDB table in AWS
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

## Testing the API

Open `client-example.html` in your browser to test all endpoints with a simple UI.

## License

ISC
